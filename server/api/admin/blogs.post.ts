import { File } from "formidable"
import sharp from "sharp"
import { readFormData } from "~/server/utils/readFormData"
import { serverSupabaseClient } from "#supabase/server"
import { useUniqueId } from "@/composables/useUniqueId"

interface Dto {
  title: string,
  content: string,
  link: string
  images: File[]
}

export default defineEventHandler(async (event) => {
  const {
    title,
    content,
    link,
    images,
  } = await readFormData<Dto>(event, { multiples: true })
  const buffers = await Promise.all(images.map(img =>
    sharp(img.toJSON().filepath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer(),
  ))

  const imageUploadResults = await Promise.all(buffers.map(buffer =>
    serverSupabaseClient(event).storage.from("sale-itshu-static").upload(`images/${useUniqueId()}.webp`, buffer, {
      cacheControl: "31536000", // 1 year
    }),
  )).catch((e) => {
    throw createError({
      statusCode: 500,
      statusMessage: e,
    })
  })

  await event.context.prisma.post.create({
    data: {
      title,
      content,
      link,
      images: {
        createMany: {
          data: imageUploadResults.map(r => ({ url: r.data!.path })),
        },
      },
    },
  })

  return ""
})

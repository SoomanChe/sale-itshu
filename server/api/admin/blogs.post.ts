import { File } from "formidable"
import sharp from "sharp"
import { readFormData } from "~/server/utils/readFormData"
import { serverSupabaseClient } from "#supabase/server"

interface Dto {
  title: string,
  content: string,
  link: string
  images: File[]
}
export function useUniqueId () {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString()
}
export default defineEventHandler(async (event) => {
  const {
    title,
    content,
    link,
    images
  } = await readFormData<Dto>(event, { multiples: true })
  const buffers = await Promise.all(images.map(img => sharp(img.toJSON().filepath).webp({ quality: 80 }).toBuffer()))

  const results = await Promise.all(buffers.map(buffer =>
    serverSupabaseClient(event).storage.from("sale-itshu-static").upload(`images/${useUniqueId()}.webp`, buffer, {
      cacheControl: "31536000" // 1 year
    })
  )).catch((e) => {
    throw createError({
      statusCode: 500,
      statusMessage: e
    })
  })
  console.log("results:", results)
  const newVar = await serverSupabaseClient(event).storage.from("sale-itshu-static").list()
  console.log("list: ", newVar)

  await event.context.prisma.post.create({
    data: {
      title,
      content,
      link,
      images: {
        createMany: {
          data: results.map(r => ({ url: r.data!.path }))
        }
      }
    }
  })

  return ""
})

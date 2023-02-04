import { File } from "formidable"
import { readFormData } from "~/server/utils/readFormData"

interface Dto {
  title: string,
  content: string,
  images: File[]
}

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, content, images } = await readFormData<Dto>(event, { multiples: true })
  // const buffers = await Promise.all(images.map(img => sharp(img.toJSON().filepath).webp({ quality: 80 }).toBuffer()))
  // const results = await Promise.all(buffers.map(buffer =>
  //   serverSupabaseClient(event).storage.from("sale-itshu-static").upload(`images/${useUniqueId()}.webp`, buffer, {
  //     cacheControl: "31536000", // 1 year
  //   }),
  // )).catch((e) => {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: e,
  //   })
  // })

  await event.context.prisma.post.create({
    data: {
      title,
      content,
      images: {
        createMany: {
          data: [{ data: { path: "test" } }, { data: { path: "test2" } }].map(r => ({ url: r.data!.path })),
        },
      },
    },
  })

  return ""
})

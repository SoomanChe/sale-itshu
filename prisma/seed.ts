import { db } from "../server/utils/db"
import { PrismaClient } from "./.client"
const prisma = new PrismaClient()
async function main () {
  const result = await Promise.all(
    db.map(v =>
      prisma.post.create({
        data: {
          title: v.title,
          content: v.content,
          link: "http://example.com",
          images: {
            createMany: {
              // @ts-ignore
              data: v.images.map(r => ({ url: r })),
            },
          },
        },
      })),

  )
  console.log(result)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

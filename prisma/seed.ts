import * as Prisma from "@prisma/client"
import { db } from "../server/utils/db"
const { PrismaClient } = Prisma
const prisma = new PrismaClient()

async function main () {
  const result = await Promise.all(
    db.map(v =>
      prisma.post.create({
        data: {
          title: v.title,
          content: v.content,
          link: "http://example.com",
          tags: {
            create: v.tags.map(tag => ({
              tag: {
                connectOrCreate: {
                  where: {
                    text: tag,
                  },
                  create: {
                    text: tag,
                  },
                },
              },
            })),
          },
          images: {
            createMany: {
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

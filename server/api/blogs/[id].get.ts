import dayjs from "dayjs"

export default defineEventHandler(async (event) => {
  const {
    images,
    created_at: createdAt,
    updated_at: updatedAt,
    ...remain
  } = await event.context.prisma.post.findFirstOrThrow({
    where: {
      id: +event.context.params.id,
    },
    include: {
      images: true,
    },
  })

  return {
    ...remain,
    createdAt: dayjs(createdAt),
    updatedAt,
    images: images.map(img => img.url),
  }
})

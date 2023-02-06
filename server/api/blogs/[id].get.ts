export default defineEventHandler(async (event) => {
  const { images, ...remain } = await event.context.prisma.post.findFirstOrThrow({
    where: {
      id: +event.context.params.id,
    },
    include: {
      images: true,
    },
  })

  return {
    ...remain,
    images: images.map(img => img.url),
  }
})

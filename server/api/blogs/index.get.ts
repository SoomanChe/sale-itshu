export default defineEventHandler(async (event) => {
  const { page } = await getQuery(event)
  if (Array.isArray(page) || !page) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signatures",
    })
  }

  const _result = await event.context.prisma.post.findMany({
    take: 10,
    skip: 10 * (+page - 1),
    orderBy: { created_at: "desc" },
    include: { images: true },
  })
  return _result.map(({ images, ...v }) => ({
    ...v,
    images: images.map(img => img.url),
  }))
})

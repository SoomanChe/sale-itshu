import dayjs from "dayjs"
import { imagePrefix } from "~/constants"

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "올바르지 않은, id값 입니다." })
  }
  const {
    images,
    created_at: createdAt,
    updated_at: updatedAt,
    ...remain
  } = await event.context.prisma.post.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      images: true,
    },
  })

  return {
    ...remain,
    createdAt: dayjs(createdAt),
    updatedAt,
    images: images.map(img => imagePrefix + img.url),
  }
})

import { paginate } from "~/server/utils/db"

export default defineEventHandler(async (event) => {
  const { page } = await getQuery(event)
  if (Array.isArray(page) || !page) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signatures",
    })
  }

  return paginate(10, page)
})

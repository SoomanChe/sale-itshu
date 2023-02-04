import { db } from "~/server/api/blogs/db"

export default defineEventHandler(async (event) => {
  return db[+event.context.params.id - 1]
})

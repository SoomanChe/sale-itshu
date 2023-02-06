import { db } from "~/server/utils/db"

export default defineEventHandler(async (event) => {
  return db[+event.context.params.id - 1]
})

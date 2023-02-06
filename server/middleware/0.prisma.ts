/* eslint-disable */
// @ts-nocheck
import * as Prisma from "@prisma/client"

import { default as ProdPrisma } from "@prisma/client"

let { PrismaClient } = Prisma
if (!process.env.NODE_ENV === "development") { PrismaClient = ProdPrisma.PrismaClient }

let prisma: PrismaClient

declare module "h3" {
  interface H3EventContext {
    prisma: InstanceType<typeof PrismaClient>
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})

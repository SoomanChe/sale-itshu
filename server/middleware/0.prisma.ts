import { PrismaClient } from '~/prisma/.client/index'

let prisma: PrismaClient

declare module 'h3' {
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

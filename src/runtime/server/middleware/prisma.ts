import { PrismaClient } from '@prisma/client'
import { eventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

let prisma: PrismaClient

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: useRuntimeConfig().databaseUrl
        }
      }
    })
  }
  event.context.prisma = prisma
})

import { PrismaClient } from '@prisma/client'
import { eventHandler } from 'h3'

let prisma
export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
})

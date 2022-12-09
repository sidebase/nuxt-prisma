export default eventHandler((event) => {
  return event.context.prisma.$queryRaw`SELECT "hello world";`
})

import { execSync } from 'child_process'
import { defineNuxtModule, createResolver, useLogger } from '@nuxt/kit'
export interface ModuleOptions {
  isEnabled: boolean
}

const PACKAGE_NAME = 'nuxt-prisma'
const defaults: ModuleOptions = {
  isEnabled: true
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: `@sidebase/${PACKAGE_NAME}`,
    configKey: 'prisma'
  },
  hooks: {
    'nitro:config': (nitroConfig) => {
      console.log('nitro handlers are', nitroConfig.handlers)
    },
    'nitro:init': (nitro) => {
      console.log('nitro handlers init are', nitro.options.handlers)
    },
    'nitro:build:before': (nitro) => {
      console.log('nitro handlers before build are', nitro.options.handlers)
    }
  },
  defaults,
  setup (moduleOptions, nuxt) {
    const logger = useLogger(PACKAGE_NAME)

    // 1. Check if module should be enabled at all
    if (!moduleOptions.isEnabled) {
      logger.info(`Skipping ${PACKAGE_NAME} setup, as module is disabled`)
      return
    }

    logger.info('Setting up prisma...')

    // 2. Locate runtime directory and transpile module
    const { resolve } = createResolver(import.meta.url)

    // 3. Setup middleware, use `.unshift` to ensure (reasonably well) that the prisma middleware is first
    const handler = resolve('./runtime/server/middleware/prisma')
    const serverHandler = {
      middleware: true,
      handler
    }
    nuxt.options.serverHandlers.unshift(serverHandler)

    logger.info('Prisma setup complete, use the client as `event.context.prisma` in your api event handlers')
  }
})

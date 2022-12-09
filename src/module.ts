import { resolve } from 'path'
import { defineNuxtModule, createResolver, useLogger, addServerPlugin, resolvePath, addImportsDir, extendViteConfig, addServerHandler } from '@nuxt/kit'

export interface ModuleOptions {
  isEnabled: boolean
}

const PACKAGE_NAME = 'nuxt-prisma'
const defaults: ModuleOptions = {
  isEnabled: true
}

/**
 * Takes a path to a file, makes it absolute and then sets the `DATABASE_URL` environment variable to a value of the form `file:/path/to/db.sqlite`.
 *
 * This method can be helpful for development and testing to ensure that all code uses the same, absolute `db.sqlite` file.
 *
 * @param pathToSqliteFile string The location of the `db.sqlite` file. E.g.: `./db.sqlite` or `db.sqlite` or `/Users/test/nuxt-prisma/db.sqlite`
 * @param environmentVariableName string Name of the environment variable to export the `file:/...` database url to, this is the name that prisma uses in the `schema.prisma` `env(...)` directive
 */
export const setAbsoluteSqliteDatabaseUrlForPrisma = (pathToSqliteFile: string = resolve('./db.sqlite'), environmentVariableName = 'DATABASE_URL') => {
  if (process.env.DATABASE_URL) {
    // User or nuxt set their own `DATABASE_URL`, do not overwrite it
    return
  }

  // We need to resolve again in case a relative path was passed
  const absoluteDbPath = `file:${resolve(pathToSqliteFile)}`
  process.env[environmentVariableName] = absoluteDbPath
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: `@sidebase/${PACKAGE_NAME}`,
    configKey: 'prisma'
  },
  defaults,
  setup (moduleOptions, nuxt) {
    const logger = useLogger(PACKAGE_NAME)

    // 1. Check if module should be enabled at all
    if (!moduleOptions.isEnabled) {
      logger.info(`Skipping ${PACKAGE_NAME} setup, as module is disabled`)
      return
    }

    logger.info('`nuxt-prisma` setup starting')

    // 2. Locate runtime directory
    const { resolve } = createResolver(import.meta.url)

    // 3. Setup middleware
    const handler = resolve('./runtime/server/middleware/prisma')
    const serverHandler = {
      middleware: true,
      handler
    }
    addServerHandler(serverHandler)

    logger.info('`nuxt-prisma` setup done')
  }
})

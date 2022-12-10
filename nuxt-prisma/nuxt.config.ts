import { resolve } from 'path'
import { execSync } from 'child_process'
import { defineNuxtConfig } from 'nuxt/config'
import { PrismaClient } from '@prisma/client'
import type { H3Event } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

// Reset database via programmatic prisma invocation, see https://github.com/prisma/prisma/issues/13549#issuecomment-1144883246
export function resetDatabase () {
  execSync(`cd ${process.cwd()} && DATABASE_URL=${process.env.DATABASE_URL} prisma db push --force-reset`, { stdio: 'inherit' })
}

export function usePrisma (event: any | H3Event): PrismaClient {
  return event.context.prisma
}

/**
 * Takes a path to a file, makes it absolute and then sets the `DATABASE_URL` environment variable to a value of the form `file:/path/to/db.sqlite`.
 *
 * This method can be helpful for development and testing to ensure that all code uses the same, absolute `db.sqlite` file.
 *
 * @param pathToSqliteFile string The location of the `db.sqlite` file. E.g.: `./db.sqlite` or `db.sqlite` or `/Users/test/nuxtprisma/db.sqlite`
 * @param environmentVariableName string Name of the environment variable to export the `file:/...` database url to, this is the name that prisma uses in the `schema.prisma` `env(...)` directive
 */
export function setAbsoluteSqliteDatabaseUrlForPrisma (pathToSqliteFile: string = resolve('./db.sqlite'), environmentVariableName = 'DATABASE_URL') {
  if (process.env.DATABASE_URL) {
    // User or nuxt set their own `DATABASE_URL`, do not overwrite it
    return
  }

  // We need to resolve again in case a relative path was passed
  const absoluteDbPath = `file:${resolve(pathToSqliteFile)}`
  process.env[environmentVariableName] = absoluteDbPath
}

export default defineNuxtConfig({})

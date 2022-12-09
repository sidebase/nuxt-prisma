import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrisma from '..'
import { setAbsoluteSqliteDatabaseUrlForPrisma } from '../src/module'

setAbsoluteSqliteDatabaseUrlForPrisma('./db.sqlite')

export default defineNuxtConfig({
  // @ts-expect-error See https://github.com/nuxt/framework/issues/8931
  modules: [NuxtPrisma]
})

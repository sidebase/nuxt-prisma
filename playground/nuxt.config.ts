import { defineNuxtConfig } from 'nuxt/config'
import NuxtPrisma from '..'

export default defineNuxtConfig({
  // @ts-expect-error See https://github.com/nuxt/framework/issues/8931
  modules: [NuxtPrisma]
})

# nuxt-prisma

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![GitHub stars](https://badgen.net/github/stars/sidebase/nuxt-session)](https://GitHub.com/sidebase/nuxt-session/)
[![License][license-src]][license-href]
[![Follow us on Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/sidebase_io)
[![Join our Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/9MUHR8WT9B)

> Nuxt prisma module to get a global instance of prisma for optimal app-performance as recommended [by the prisma docs](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#long-running-processes) and make working with prisma feel like a breeze.

## Quick start

1. Install the package:
    ```bash
    npm i -D @sidebase/nuxt-prisma
    ```
2. Add the package to your `nuxt.config.ts`:
    ```bash
    export default defineNuxtConfig({
      modules: ['@sidebase/nuxt-prisma'],
    })
    ```
3. Done! You can now access prisma inside your server-side event handlers (e.g., from `server/api` files):
    ```ts
    import { eventHandler } from 'h3'

    // Select 1 from the database and return it
    export default eventHandler(event => event.context.prisma.$queryRaw`SELECT 1;`)
    ```

## Features

- ✔️ TODO


## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@sidebase/nuxt-prisma/latest.svg
[npm-version-href]: https://npmjs.com/package/@sidebase/nuxt-prisma

[npm-downloads-src]: https://img.shields.io/npm/dt/@sidebase/nuxt-prisma.svg
[npm-downloads-href]: https://npmjs.com/package/@sidebase/nuxt-prisma

[license-src]: https://img.shields.io/npm/l/@sidebase/nuxt-prisma.svg
[license-href]: https://npmjs.com/package/@sidebase/nuxt-prisma

import { defineConfig } from '@rslib/core'
import { pluginClientGenerator } from './build/plugins/pluginGenerateClient'

import path from 'node:path'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: true,
      dts: {
        bundle: true,
        build: false,
        distPath: './dist',
      },
    },
  ],
  source: {
    tsconfigPath: path.join(__dirname, 'tsconfig.json'),
    entry: {
      index: './src/index.ts',
    },
  },
  output: {
    cleanDistPath: {
      enable: true,
    },
  },
  plugins: [pluginClientGenerator({ file: 'splitwise.spec.json' })],
})

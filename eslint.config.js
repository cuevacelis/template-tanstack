//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.output/',
      '.nitro/',
      'convex/',
      'src/components/ui',
      '.vinxi/',
      'coverage/',
      '.next/',
      '.turbo/',
      '*.min.js',
      '*.bundle.js',
      'public/',
      '.env*',
      '*.log',
    ],
  },
  ...tanstackConfig,
]

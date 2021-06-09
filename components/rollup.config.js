import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

import pkg from './package.json'

const extensions = ['.jsx', '.js', '.tsx', '.ts']

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*', runOnce: true }),
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs(),
      json(),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
  {
    input: './dist/types/src/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: './dist/index.es.js',
    plugins: [del({ targets: 'dist/types', runOnce: true })],
  },
]

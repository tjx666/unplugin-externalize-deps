import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import rollupPluginJson from '@rollup/plugin-json';
import rollupPLuginNodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

import externalizeDeps from '../../dist/rollup.mjs';

export default defineConfig({
    input: 'index.mjs',
    output: {
        format: 'esm',
        file: './dist/rollup-bundle.esm.js',
    },
    plugins: [
        rollupPluginCommonjs(),
        rollupPLuginNodeResolve(),
        rollupPluginJson(),
        externalizeDeps({
            nodeBuiltins: true,
            bundleDeps: ['lodash', /axio/],
        }),
    ],
});

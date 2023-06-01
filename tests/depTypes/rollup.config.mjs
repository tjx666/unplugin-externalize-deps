import path from 'node:path';

import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import rollupPluginJson from '@rollup/plugin-json';
import rollupPLuginNodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

import externalizeDeps from '../../dist/rollup.mjs';

const cwd = process.cwd();
const resolveRootFile = (file) => path.resolve(cwd, file);

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
            depTypes: {
                dependencies: true,
                devDependencies: false,
                optionalDependencies: true,
                peerDependencies: true,
            },
            nodeBuiltins: true,
            packagePath: [resolveRootFile('package.json'), resolveRootFile('web-module.json')],
        }),
    ],
});

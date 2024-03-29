import path from 'node:path';

import { defineConfig } from 'vite';

import externalizeDeps from '../../dist/vite.mjs';

const cwd = process.cwd();
const resolveRootFile = (file) => path.resolve(cwd, file);
export default defineConfig({
    plugins: [
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
    build: {
        lib: {
            entry: 'index.mjs',
            formats: ['esm'],
            fileName: 'vite-bundle',
        },
        minify: false,
        reportCompressedSize: false,
    },
});

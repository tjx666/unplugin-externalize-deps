import { defineConfig } from 'vite';

import externalizeDeps from '../../dist/vite.mjs';

export default defineConfig({
    plugins: [
        externalizeDeps({
            depTypes: {
                dependencies: true,
                devDependencies: false,
                optionalDependencies: true,
                peerDependencies: true,
            },
            nodeBuiltins: true
        }),
    ],
    build: {
        lib: {
            entry: 'index.mjs',
            formats: ['esm'],
            fileName: 'bundle'
        },
        minify: false,
        reportCompressedSize: false
    },
});

import { defineConfig } from 'vite';

import externalizeDeps from '../../dist/vite.mjs';

export default defineConfig({
    plugins: [
        externalizeDeps({
            nodeBuiltins: true,
            bundleDeps: ['lodash', /axio/],
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

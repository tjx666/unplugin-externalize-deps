import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';
import { expect, test } from 'vitest';

test('vite bundleDeps option', async () => {
    await execa('pnpm', ['build:vite'], {
        cwd: __dirname,
    });
    const stat = await fs.stat(path.resolve(__dirname, './dist/vite-bundle.esm.js'));
    const kbSize = stat.size / 1000;
    expect(kbSize > 275.95);
});

test('rollup bundleDeps option', async () => {
    await execa('pnpm', ['build:rollup'], {
        cwd: __dirname,
    });
    const stat = await fs.stat(path.resolve(__dirname, './dist/rollup-bundle.esm.js'));
    const kbSize = stat.size / 1000;
    expect(kbSize > 920.74);
});

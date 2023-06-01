import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';
import { expect, test } from 'vitest';

test('vite depTypes option', async () => {
    await execa('pnpm', ['build:vite'], {
        cwd: __dirname,
    });
    const output = await fs.readFile(path.resolve(__dirname, './vite-output.js'), 'utf8');
    const bundle = await fs.readFile(path.resolve(__dirname, './dist/vite-bundle.esm.js'), 'utf8');
    expect(bundle).toBe(output);
});

test('rollup depTypes option', async () => {
    await execa('pnpm', ['build:rollup'], {
        cwd: __dirname,
    });
    const output = await fs.readFile(path.resolve(__dirname, './rollup-output.js'), 'utf8');
    const bundle = await fs.readFile(
        path.resolve(__dirname, './dist/rollup-bundle.esm.js'),
        'utf8',
    );
    expect(bundle).toBe(output);
});

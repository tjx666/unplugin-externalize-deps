import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';
import { expect, test } from 'vitest';

test('depTypes option', async () => {
    await execa('pnpm', ['build'], {
        cwd: __dirname,
    });
    const output = await fs.readFile(path.resolve(__dirname, './output.js'), 'utf8');
    const bundle = await fs.readFile(path.resolve(__dirname, './dist/bundle.esm.js'), 'utf8');
    expect(bundle).toBe(output);
});

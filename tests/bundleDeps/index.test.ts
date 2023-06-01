import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';
import { expect, test } from 'vitest';

test('bundleDeps option', async () => {
    await execa('pnpm', ['build'], {
        cwd: __dirname,
    });
    const stat = await fs.stat(path.resolve(__dirname, './dist/bundle.esm.js'));
    const kbSize = stat.size / 1000;
    expect(kbSize > 275.95);
});

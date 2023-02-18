import path from 'node:path';
import fs from 'node:fs/promises';

async function main() {
    const source = await fs.readFile(path.resolve(process.cwd(), './index.mjs'), 'utf8');
    const bundle = await fs.readFile(path.resolve(process.cwd(), './dist/bundle.esm.js'), 'utf8');
    if (source !== bundle) {
        throw new Error('bundle content is not the same as source, test failed!')
    }
}

main();
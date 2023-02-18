/* eslint-disable security/detect-non-literal-regexp */
import fs from 'node:fs/promises';
import { builtinModules } from 'node:module';
import path from 'node:path';

import escapeStringRegexp from 'escape-string-regexp';

import type { OptionsResolved } from './options';

export async function resolveExternal(options: OptionsResolved) {
    const externalDeps = new Set<RegExp>();
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

    for (const depType of Object.keys(options.depTypes) as Array<
        keyof OptionsResolved['depTypes']
    >) {
        if (options.depTypes[depType] === true) {
            for (const dep of Object.keys(pkg[depType] ?? {})) {
                const depMatcher = new RegExp(`^${escapeStringRegexp(dep)}(?:/.+)?$`);
                externalDeps.add(depMatcher);
            }
        }
    }

    if (options.nodeBuiltins) {
        builtinModules.forEach((builtinModule) => {
            const builtinMatcher = new RegExp(`^(?:node:)?${escapeStringRegexp(builtinModule)}$`);
            externalDeps.add(builtinMatcher);
        });
    }
    return [...externalDeps];
}

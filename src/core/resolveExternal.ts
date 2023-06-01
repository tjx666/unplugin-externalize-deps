/* eslint-disable security/detect-non-literal-regexp */
import fs from 'node:fs/promises';
import { builtinModules } from 'node:module';

import type { OptionsResolved } from './options';

/**
 * @see https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js
 */
function escapeStringRegexp(regexpStr: string) {
    if (typeof regexpStr !== 'string') {
        throw new TypeError('Expected a string');
    }

    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return (
        regexpStr
            // eslint-disable-next-line unicorn/better-regex
            .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            .replace(/-/g, '\\x2d')
    );
}

/**
 * ref: https://github.com/voracious/vite-plugin-externalize-deps/blob/main/src/index.ts
 */
export async function resolveExternal(options: OptionsResolved) {
    const externalDeps = new Set<RegExp>();

    const pkgs = await Promise.all(
        options.packagePath.map(async (packagePath) => {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            const jsonStr = await fs.readFile(packagePath, 'utf8');
            return JSON.parse(jsonStr);
        }),
    );

    for (const pkg of pkgs) {
        for (const depType of Object.keys(options.depTypes)) {
            if (options.depTypes[depType] === true) {
                for (const dep of Object.keys(pkg[depType] ?? {})) {
                    if (options.bundleDeps.some((bundleDep) => bundleDep.test(dep))) {
                        continue;
                    }
                    const depMatcher = new RegExp(`^${escapeStringRegexp(dep)}(?:/.+)?$`);
                    externalDeps.add(depMatcher);
                }
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

import path from 'node:path';

import { createUnplugin } from 'unplugin';

import { resolveOption } from './core/options';
import type { Options } from './core/options';
import { resolveExternal } from './core/resolveExternal';

export default createUnplugin<Options | undefined>((rawOptions = {}) => {
    const optionsResolved = resolveOption(rawOptions);
    let external: RegExp[];
    return {
        name: 'unplugin-externalize-deps',

        vite: {
            config: async (_config, _env) => {
                return {
                    build: {
                        rollupOptions: {
                            external: await resolveExternal(optionsResolved),
                        },
                    },
                };
            },
        },

        // ref: https://github.com/Septh/rollup-plugin-node-externals/blob/main/src/index.ts#L231
        rollup: {
            async buildStart() {
                external = await resolveExternal(optionsResolved);
            },

            async resolveId(id) {
                // Ignore virtual modules and already resolved ids.
                if (id.codePointAt(0) === 0 || path.isAbsolute(id)) return null;

                return external.some((regexp) => regexp.test(id))
                    ? false // external
                    : null; // normal handling
            },
        },
    };
});

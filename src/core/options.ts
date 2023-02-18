import deepMerge from 'deepmerge';
import type { DeepRequired } from 'ts-essentials';

export interface Options {
    /** any first level field in package.json */
    depTypes?: {
        dependencies: boolean;
        devDependencies: boolean;
        optionalDependencies: boolean;
        peerDependencies: boolean;
        [key: string]: boolean;
    };
    /**
     * whether externalize node builtin modules like: fs, path
     * Note: this will also externalize node builtin modules with `node:` protocol like: node:fs, node:path
     */
    nodeBuiltins?: boolean;
}

export type OptionsResolved = DeepRequired<Options>;

export function resolveOption(options: Options) {
    return deepMerge(
        {
            depTypes: {
                dependencies: true,
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: true,
            },
            nodeBuiltins: true,
        } satisfies OptionsResolved,
        options,
    ) as OptionsResolved;
}

import type { DeepRequired } from 'ts-essentials';

export interface Options {
    /** any first level field in package.json */
    depTypes?: {
        /** @default true */
        dependencies: boolean;
        /** @default false */
        devDependencies: boolean;
        /** @default true */
        optionalDependencies: boolean;
        /** @default true */
        peerDependencies: boolean;
        [key: string]: boolean;
    };
    /**
     * whether externalize node builtin modules like: fs, path
     *
     * Note: this will also externalize node builtin modules with `node:` protocol, like: node:fs, node:path
     *
     * @default true
     */
    nodeBuiltins?: boolean;
}
export type OptionsResolved = DeepRequired<Options>;

export function resolveOption(options: Options): OptionsResolved {
    const defaultDepTypes = {
        dependencies: true,
        devDependencies: false,
        optionalDependencies: true,
        peerDependencies: true,
    };
    return {
        depTypes:
            typeof options.depTypes === 'object'
                ? { ...defaultDepTypes, ...options.depTypes }
                : defaultDepTypes,
        nodeBuiltins: options.nodeBuiltins ?? true,
    };
}

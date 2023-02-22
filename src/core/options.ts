import path from 'node:path';

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
     * @default false
     */
    nodeBuiltins?: boolean;
    /**
     * the path(s) to your package.json, or similar json config file, for example: importmap config
     *
     * @default path.resolve(process.cwd(), 'package.json')
     */
    packagePath?: string | string[];
}
export type OptionsResolved = Omit<DeepRequired<Options>, 'packagePath'> & {
    packagePath: string[];
};

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
        nodeBuiltins: options.nodeBuiltins ?? false,
        packagePath: (typeof options.packagePath === 'string'
            ? [options.packagePath]
            : options.packagePath) ?? [path.resolve(process.cwd(), 'package.json')],
    };
}

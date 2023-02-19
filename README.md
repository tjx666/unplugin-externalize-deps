# unplugin-externalize-deps

[![NPM version](https://img.shields.io/npm/v/unplugin-externalize-deps?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-externalize-deps) [![Test](https://github.com/tjx666/unplugin-externalize-deps/actions/workflows/test.yml/badge.svg)](https://github.com/tjx666/unplugin-externalize-deps/actions/workflows/test.yml)

externalize dependencies from production build

## 📦 Installation

```shell
# npm
npm i unplugin-externalize-deps

# pnpm
pnpm i unplugin-externalize-deps
```

<details>
<summary>Vite</summary><br>

```typescript
// vite.config.ts
import UnpluginExternalizeDeps from 'unplugin-externalize-deps/vite';

export default defineConfig({
  plugins: [UnpluginExternalizeDeps()],
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```typescript
// rollup.config.js
import UnpluginExternalizeDeps from 'unplugin-externalize-deps/rollup';

export default {
  plugins: [UnpluginExternalizeDeps()],
};
```

<br></details>

## ⚙️ Options

```typescript
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
```

## ❤️ Thanks

- [unplugin-starter](https://github.com/sxzz/unplugin-starter)
- [vite-plugin-externalize-deps](https://github.com/voracious/vite-plugin-externalize-deps)
- [rollup-plugin-node-externals](https://github.com/Septh/rollup-plugin-node-externals)

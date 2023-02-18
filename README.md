# unplugin-externalize-deps

[![NPM version](https://img.shields.io/npm/v/unplugin-externalize-deps?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-externalize-deps) [![Unit Test](https://github.com/tjx666/unplugin-externalize-deps/actions/workflows/unit-test.yml/badge.svg)](https://github.com/tjx666/unplugin-externalize-deps/actions/workflows/unit-test.yml)

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
import UnpluginExternalize from 'unplugin-externalize-deps/vite';

export default defineConfig({
  plugins: [UnpluginExternalize()],
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```typescript
// rollup.config.js
import UnpluginExternalize from 'unplugin-externalize-deps/rollup';

export default {
  plugins: [UnpluginExternalize()],
};
```

<br></details>

## ⚙️ Options

```typescript
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
```

## ❤️ Thanks

- [unplugin-starter](https://github.com/sxzz/unplugin-starter)
- [vite-plugin-externalize-deps](https://github.com/voracious/vite-plugin-externalize-deps)
- [rollup-plugin-node-externals](https://github.com/Septh/rollup-plugin-node-externals)

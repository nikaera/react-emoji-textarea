import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/EmojiTextArea.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'lib',
  clean: true,
  splitting: false,
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.js' };
  },
});

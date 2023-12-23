import typescript from "@rollup/plugin-typescript";

export default {
  input: "./packages/vue/src/index.ts",
  output: [
    // common.js
    {
      format: "cjs",
      file: "packages/vue/dist/mini-vue.cjs.js",
      sourcemap: true,
    },
    // ESM
    {
      format: "es",
      file: "packages/vue/dist/mini-vue.esm.js",
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
};

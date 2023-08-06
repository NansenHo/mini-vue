import pkg from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
export default {
  input: "./src/index.ts",
  output: [
    // common.js
    {
      format: "cjs",
      file: pkg.main,
    },
    // ESM
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [typescript()],
};

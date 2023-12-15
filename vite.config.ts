import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      "**/node_modules/**",
      "**/.{git,trunk,idea,vscode}/**",
      "**/dist/**",
      "**/.trunk/**/*.test.{js,ts,jsx,tsx}",
    ],
  },
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false,
    specPattern: "packages/vue/example/__tests__/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});

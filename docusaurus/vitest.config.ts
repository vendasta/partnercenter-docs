import {defineConfig} from 'vitest/config';

// Unit tests for pure TypeScript modules (no Docusaurus runtime). UI is verified in the browser.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fileParallelism: false,
    // maxThreads: 1,
    // minThreads: 1,
    sequence: { concurrent: false },
    testTimeout: 10000,
    environment: "node",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    exclude: ["dist/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],

      include: ["src/**/*.ts"],
      exclude: ["src/server.ts"]
    }
  }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        fileParallelism: false,
        maxThreads: 1,
        minThreads: 1,
        sequence: { concurrent: false },
        testTimeout: 10000,
        environment: "node",
        globals: true,
        setupFiles: ["./tests/setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov"],
            all: true,
            include: ["src/**/*.ts"],
            exclude: ["src/server.ts"],
        },
    },
});

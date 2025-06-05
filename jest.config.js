import { createDefaultPreset } from "ts-jest";

/** @type {import('jest').Config} */
export default {
  ...createDefaultPreset(),
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/**/*.stories.{ts,tsx}",
    "!<rootDir>/src/test-utils/**/*",
  ],
};

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

/** @type {import('rollup').InputOptions[]} */
export default [
  {
    input: "src/index.ts",
    output: [
      { file: "lib/index.js", format: "esm" },
      { file: "lib/index.cjs", format: "cjs", exports: "auto" },
    ],
    plugins: [
      resolve(),
      typescript({
        declaration: true,
        declarationDir: "lib/types",
        exclude: [
          "**/*.test.{ts,tsx}",
          "**/*.stories.{ts,tsx}",
          "**/test-utils/**/*",
        ],
      }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "lib/types/index.d.ts",
    output: {
      file: "lib/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];

import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.{ts,tsx}"],
  staticDirs: ["./public"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
} satisfies StorybookConfig;

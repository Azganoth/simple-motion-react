import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: ["../src/**/*.stories.{ts,tsx}"],
  staticDirs: ["./public"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
} satisfies StorybookConfig;

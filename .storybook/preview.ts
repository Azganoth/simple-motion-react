import type { Preview } from "@storybook/react-vite";
import "../src/test-utils/styles.css";
import theme from "./theme";

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    docs: {
      theme,
      source: {
        language: "tsx",
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Getting Started", "Recipes", "Contributing"],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Preview;

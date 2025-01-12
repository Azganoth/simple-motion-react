import type { Preview } from "@storybook/react";
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
        order: ["Transition"],
      },
    },
  },
  tags: ["autodocs"],
} satisfies Preview;

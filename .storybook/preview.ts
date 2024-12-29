import type { Preview } from "@storybook/react";
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
    },
  },
  tags: ["autodocs"],
} satisfies Preview;

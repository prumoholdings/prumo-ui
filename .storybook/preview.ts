import type { Preview } from "@storybook/react";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/figtree";
// The full Storybook/dev stylesheet: Tailwind v4 entry + token contract + theme.
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // axe (a11y addon) runs on every story; surfaces violations in the panel.
    a11y: { test: "error" },
    backgrounds: { disable: true },
    // Sidebar order: Tokens (the contract) -> Primitives -> Composites.
    options: {
      storySort: {
        order: ["Tokens", "Primitives", "Composites"],
      },
    },
  },
};

export default preview;

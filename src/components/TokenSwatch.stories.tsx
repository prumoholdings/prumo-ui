import type { Meta, StoryObj } from "@storybook/react";
import { TokenSwatch, TokenPalette } from "./TokenSwatch";
import { TOKEN_FAMILIES } from "../tokens";

const meta = {
  title: "Foundations/Tokens",
  component: TokenSwatch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof TokenSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single color-role swatch reading `var(--primary)`. */
export const Swatch: Story = {
  args: { token: "primary" },
};

/** The full color-role palette (the contract surface for review). */
export const ColorRoles: Story = {
  args: { token: "primary" },
  render: () => <TokenPalette family="color" />,
};

/** Every token FAMILY as a labelled section — the chairman's contract review. */
export const AllFamilies: Story = {
  args: { token: "primary" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-stack)" }}>
      {(Object.keys(TOKEN_FAMILIES) as (keyof typeof TOKEN_FAMILIES)[]).map((family) => (
        <section key={family} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{ fontSize: "var(--text-h3)", margin: 0 }}>{family}</h2>
          <ul style={{ margin: 0, paddingInlineStart: "1.25rem", fontSize: "var(--text-small)" }}>
            {TOKEN_FAMILIES[family].map((t) => (
              <li key={t}>
                <code>{`--${t}`}</code>
              </li>
            ))}
          </ul>
          {family === "color" ? <TokenPalette family="color" /> : null}
        </section>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import {
  ComparisonTable,
  type ComparisonAttribute,
  type ComparisonEntity,
} from "./comparison-table";

const attributes: ComparisonAttribute[] = [
  { id: "rating", label: "Overall rating", format: "score", scoreMax: 5 },
  { id: "price", label: "Annual cost", format: "currency", currency: "EUR" },
  { id: "tier", label: "Tier", format: "badge" },
  { id: "support", label: "24/7 support", format: "check" },
  { id: "trial", label: "Free trial", format: "check" },
  { id: "notes", label: "Best for", format: "text", hint: "editorial summary" },
];

const entities: ComparisonEntity[] = [
  {
    id: "a",
    name: "Aurora",
    subtitle: "by Helios",
    values: { rating: 4.5, price: 1200, tier: "Pro", support: true, trial: true, notes: "Teams" },
  },
  {
    id: "b",
    name: "Beacon",
    subtitle: "by Lumen",
    values: { rating: 3.8, price: 600, tier: "Starter", support: false, trial: true, notes: "Solo" },
  },
  {
    id: "c",
    name: "Cobalt",
    subtitle: "by Forge",
    values: { rating: 4.9, price: 2400, tier: "Enterprise", support: true, trial: false, notes: "Scale" },
  },
];

const meta: Meta<typeof ComparisonTable> = {
  title: "Composites/ComparisonTable",
  component: ComparisonTable,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

/** Entities as columns, attributes as rows. Below ~768px the SAME matrix reflows
 * to per-entity stacked cards (one DOM tree, no h-scroll). */
export const Default: Story = {
  args: { entities, attributes, caption: "Tool comparison" },
};

export const Empty: Story = {
  args: { entities: [], attributes, emptyState: "Add at least one option to compare." },
};

/** Thin / mismatched data renders gracefully (missing values show an em-dash). */
export const SparseData: Story = {
  args: {
    attributes,
    entities: [
      { id: "x", name: "Mystery", values: { rating: 4.1, tier: "Pro" } },
      { id: "y", name: "Partial", values: { price: 900, support: true } },
    ],
  },
};

/** The same ComparisonTable under a WARM vs SHARP token skin. */
export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div
        style={{
          ["--primary" as string]: "oklch(0.62 0.16 40)",
          ["--secondary" as string]: "oklch(0.92 0.04 70)",
          ["--radius" as string]: "1rem",
          ["--background" as string]: "oklch(0.99 0.01 70)",
          padding: "1rem",
          background: "var(--background)",
        }}
      >
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Warm</h3>
        <ComparisonTable entities={entities} attributes={attributes} caption="Warm" />
      </div>
      <div
        style={{
          ["--primary" as string]: "oklch(0.5 0.16 264)",
          ["--secondary" as string]: "oklch(0.93 0.02 264)",
          ["--radius" as string]: "0.125rem",
          ["--background" as string]: "oklch(0.99 0.004 264)",
          padding: "1rem",
          background: "var(--background)",
        }}
      >
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Sharp</h3>
        <ComparisonTable entities={entities} attributes={attributes} caption="Sharp" />
      </div>
    </div>
  ),
};

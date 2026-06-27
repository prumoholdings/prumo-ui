import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import {
  ComparisonTable,
  type ComparisonAttribute,
  type ComparisonEntity,
} from "./comparison-table";

/* The canonical "compare schools" use-case the chairman reviewed — anti-ranking:
 * every cell shows magnitude/category FACTUALLY (meter, bar, pill, colored
 * yes/no) without a good/bad verdict and without sorting by any value. */
const attributes: ComparisonAttribute[] = [
  { id: "ofsted", label: "Ofsted rating", format: "badge", hint: "most recent inspection" },
  { id: "classSize", label: "Class size", format: "count", unit: "pupils" },
  { id: "progress", label: "Progress score", format: "score", scoreMax: 10 },
  { id: "freeMeals", label: "Free school meals", format: "percent" },
  { id: "sen", label: "SEN unit", format: "check" },
  { id: "breakfast", label: "Breakfast club", format: "check" },
  { id: "distance", label: "Catchment distance", format: "text", hint: "from postcode" },
];

const entities: ComparisonEntity[] = [
  {
    id: "stmarys",
    name: "St Mary's CofE",
    subtitle: "Primary",
    values: {
      ofsted: "Outstanding",
      classSize: 24,
      progress: 8.4,
      freeMeals: 22,
      sen: true,
      breakfast: true,
      distance: "0.4 mi",
    },
  },
  {
    id: "oakfield",
    name: "Oakfield Academy",
    subtitle: "Community",
    values: {
      ofsted: "Good",
      classSize: 27,
      progress: 7.1,
      freeMeals: 31,
      sen: false,
      breakfast: true,
      distance: "1.1 mi",
    },
  },
  {
    id: "rivers",
    name: "Riverside Primary",
    subtitle: "Foundation",
    values: {
      ofsted: "Requires Improvement",
      classSize: 30,
      progress: 5.6,
      freeMeals: 44,
      sen: true,
      breakfast: false,
      distance: "0.8 mi",
    },
  },
  {
    id: "elmwood",
    name: "Elmwood Park",
    subtitle: "Community",
    values: {
      ofsted: "Good",
      classSize: 26,
      progress: 6.9,
      freeMeals: 18,
      sen: false,
      breakfast: false,
      distance: "1.6 mi",
    },
  },
  {
    id: "hollybank",
    name: "Hollybank Junior",
    subtitle: "Academy",
    values: {
      ofsted: "Outstanding",
      classSize: 22,
      progress: 8.9,
      freeMeals: 12,
      sen: true,
      breakfast: true,
      distance: "2.3 mi",
    },
  },
];

const meta: Meta<typeof ComparisonTable> = {
  title: "Composites/ComparisonTable",
  component: ComparisonTable,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

/** Entities as columns, attributes as rows. Each cell renders a VISUAL CUE
 * (meter / bar / category pill / colored yes-no) — never flat text. Below ~768px
 * the SAME matrix reflows to per-attribute cards (one DOM tree, no h-scroll),
 * each value carrying its school's identity dot + monogram. */
export const Default: Story = {
  args: { entities, attributes, caption: "Compare local primary schools" },
};

/** The mobile card reflow the chairman will review on a phone: per-attribute
 * cards, each school on its own line with a deterministic identity chip so you
 * can track one school down the groups. */
export const Mobile: Story = {
  args: { entities, attributes, caption: "Compare local primary schools" },
  parameters: {
    viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: "iphone12" },
    layout: "fullscreen",
  },
};

export const Empty: Story = {
  args: { entities: [], attributes, emptyState: "Add at least one school to compare." },
};

/** Thin / mismatched data renders gracefully (missing values show an em-dash). */
export const SparseData: Story = {
  args: {
    attributes,
    entities: [
      { id: "x", name: "Mystery School", values: { progress: 7.2, ofsted: "Good" } },
      { id: "y", name: "Partial Data", values: { classSize: 29, sen: true } },
    ],
  },
};

/** The same ComparisonTable under a WARM vs SHARP token skin — every cue
 * (meters, bars, pills, identity chips) retunes to the per-concept palette
 * because they all read var(--*) only. */
export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div
        style={{
          ["--primary" as string]: "oklch(0.62 0.16 40)",
          ["--secondary" as string]: "oklch(0.92 0.04 70)",
          ["--accent" as string]: "oklch(0.6 0.13 150)",
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
          ["--accent" as string]: "oklch(0.55 0.13 230)",
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

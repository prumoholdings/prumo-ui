import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import {
  ComparisonTable,
  type ComparisonAttribute,
  type ComparisonEntity,
  type ComparisonGroup,
} from "./comparison-table";

/* The canonical "compare schools" use-case — anti-ranking: every cell shows
 * magnitude/category FACTUALLY (meter, bar, category pill, yes/no) without a
 * good/bad verdict and without sorting by any value. Entities are COLUMNS;
 * attributes are ROWS; the label column is FROZEN and the header is STICKY. */
const attributes: ComparisonAttribute[] = [
  { id: "ofsted", label: "Ofsted rating", format: "badge", hint: "Latest inspection", group: "quality" },
  { id: "progress", label: "Progress score", format: "score", scoreMax: 10, hint: "Out of 10", group: "quality" },
  { id: "classSize", label: "Class size", format: "count", unit: "pupils", hint: "Avg. per class", group: "intake" },
  { id: "freeMeals", label: "Free school meals", format: "percent", hint: "% of pupils", group: "intake" },
  { id: "sen", label: "SEN support", format: "check", hint: "On-site provision", group: "facilities" },
  { id: "breakfast", label: "Breakfast club", format: "check", hint: "Before school", group: "facilities" },
  { id: "distance", label: "Catchment distance", format: "text", hint: "From postcode", group: "intake" },
];

const groups: ComparisonGroup[] = [
  { id: "quality", label: "Quality & outcomes", description: "Inspection category and measured progress" },
  { id: "intake", label: "Intake & access", description: "Who attends and how close" },
  { id: "facilities", label: "Facilities", description: "On-site provision" },
];

const entities: ComparisonEntity[] = [
  {
    id: "greenfields",
    name: "Greenfields Primary",
    subtitle: "Community",
    values: { ofsted: "Outstanding", progress: 8.4, classSize: 27, freeMeals: 22, sen: true, breakfast: true, distance: "0.4 mi" },
  },
  {
    id: "stmarys",
    name: "St Mary's CE Primary",
    subtitle: "Voluntary aided",
    values: { ofsted: "Good", progress: 7.1, classSize: 30, freeMeals: 14, sen: true, breakfast: false, distance: "0.6 mi" },
  },
  {
    id: "riverside",
    name: "Riverside Academy",
    subtitle: "Academy",
    values: { ofsted: "Good", progress: 6.8, classSize: 26, freeMeals: 31, sen: true, breakfast: true, distance: "0.8 mi" },
  },
  {
    id: "oakwood",
    name: "Oakwood Primary",
    subtitle: "Community",
    values: { ofsted: "Requires improvement", progress: 5.2, classSize: 25, freeMeals: 38, sen: false, breakfast: false, distance: "1.1 mi" },
  },
  {
    id: "willows",
    name: "The Willows School",
    subtitle: "Foundation",
    values: { ofsted: "Outstanding", progress: 9.1, classSize: 28, freeMeals: 9, sen: true, breakfast: true, distance: "0.5 mi" },
  },
];

const FOOTNOTE =
  "An anti-ranking comparison: tones and icons are categorical, never good/bad. " +
  "Ofsted ratings show inspection category only; ✓/– mark presence of a service, not quality.";

const meta: Meta<typeof ComparisonTable> = {
  title: "Composites/ComparisonTable",
  component: ComparisonTable,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

/** The full matrix — entities as columns, attributes as rows, label column frozen
 * left, header sticky on scroll. Each cell renders a VISUAL CUE (meter / bar /
 * category pill / yes-no) — never flat text. */
export const Default: Story = {
  args: { entities, attributes, caption: "Compare local primary schools" },
};

/** The approved "Variant A" composition — editorial header + sourced provenance +
 * the anti-ranking legend/footnote. This is the craft target. */
export const VariantA: Story = {
  args: {
    entities,
    attributes,
    eyebrow: "Primary school comparison",
    title: "Five schools, side by side — without the league table.",
    description:
      "A calm, scannable matrix for catchment-area families. We surface the facts and let you weigh them — no scores, no rankings, no verdicts.",
    sources: "Sources: Ofsted reports · DfE performance tables · school census 2025",
    footnote: FOOTNOTE,
    caption: "Compare local primary schools",
  },
};

/** Category-grouped: attributes fold under spanning group headers (Quality /
 * Intake / Facilities) for scannability on dense comparisons. */
export const Grouped: Story = {
  args: {
    entities,
    attributes,
    groups,
    eyebrow: "Primary school comparison",
    title: "Five schools, grouped by what matters.",
    footnote: FOOTNOTE,
    caption: "Compare local primary schools, grouped",
  },
};

/** With controls — a Key/All subset toggle + a Comfortable/Compact density
 * toggle. Defaults to the key subset. */
export const WithControls: Story = {
  args: {
    entities,
    attributes,
    keyAttributeIds: ["ofsted", "progress", "distance"],
    enableDensityToggle: true,
    caption: "Compare local primary schools",
  },
};

/** Mobile: the SAME matrix — the label column stays frozen and the school columns
 * scroll horizontally (~2 visible) with a right-edge fade + swipe hint. One DOM,
 * no per-attribute cards, no h-scroll-vs-stacked dual tree. */
export const Mobile: Story = {
  args: {
    entities,
    attributes,
    eyebrow: "School comparison",
    title: "Five schools, side by side.",
    footnote: FOOTNOTE,
    caption: "Compare local primary schools",
  },
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

/** The same ComparisonTable under a WARM vs SHARP token skin — every cue (meters,
 * bars, pills, identity chips) retunes to the per-concept palette because they all
 * read var(--*) only. */
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

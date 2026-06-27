import type { Meta, StoryObj } from "@storybook/react";
import { StatDashboard, type StatChartSpec } from "./stat-dashboard";

const kpis = [
  { label: "Revenue", value: "$48.2k", deltaPct: 12.4, hint: "vs last month" },
  { label: "Active users", value: "3,910", deltaPct: 4.1, hint: "7-day" },
  { label: "Churn", value: "1.8%", deltaPct: -0.6, hint: "improving" },
  { label: "NPS", value: "62", deltaPct: 8.0 },
];

const areaChart: StatChartSpec = {
  kind: "area",
  index: "month",
  categories: ["Revenue", "Costs"],
  colorTokens: ["primary", "accent"],
  title: "Revenue vs costs",
  data: [
    { month: "Jan", Revenue: 32, Costs: 20 },
    { month: "Feb", Revenue: 41, Costs: 22 },
    { month: "Mar", Revenue: 38, Costs: 25 },
    { month: "Apr", Revenue: 48, Costs: 24 },
    { month: "May", Revenue: 52, Costs: 27 },
  ],
};

const donutChart: StatChartSpec = {
  kind: "donut",
  index: "name",
  category: "value",
  colorTokens: ["primary", "accent", "secondary"],
  title: "Plan mix",
  data: [
    { name: "Starter", value: 40 },
    { name: "Pro", value: 35 },
    { name: "Enterprise", value: 25 },
  ],
};

const meta: Meta<typeof StatDashboard> = {
  title: "Composites/StatDashboard",
  component: StatDashboard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof StatDashboard>;

export const WithAreaChart: Story = {
  args: { kpis, chart: areaChart, columns: 4, "aria-label": "Business metrics" },
};

export const WithDonut: Story = {
  args: { kpis: kpis.slice(0, 3), chart: donutChart, columns: 3 },
};

export const KpisOnly: Story = {
  args: { kpis, columns: 4 },
};

export const Empty: Story = {
  args: { kpis: [], emptyState: "Connect a data source to see metrics." },
};

export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--accent" as string]: "oklch(0.78 0.12 70)", ["--radius" as string]: "1rem", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Warm</h3>
        <StatDashboard kpis={kpis.slice(0, 2)} chart={areaChart} columns={2} />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--accent" as string]: "oklch(0.7 0.12 200)", ["--radius" as string]: "0.125rem", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Sharp</h3>
        <StatDashboard kpis={kpis.slice(0, 2)} chart={areaChart} columns={2} />
      </div>
    </div>
  ),
};

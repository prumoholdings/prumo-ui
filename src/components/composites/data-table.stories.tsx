import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Badge } from "../ui/badge";

interface Row {
  name: string;
  category: string;
  status: "active" | "paused" | "archived";
  value: number;
}

const data: Row[] = [
  { name: "Northwind", category: "Logistics", status: "active", value: 4200 },
  { name: "Acme Co", category: "Manufacturing", status: "paused", value: 1800 },
  { name: "Globex", category: "Energy", status: "active", value: 9100 },
  { name: "Initech", category: "Software", status: "archived", value: 600 },
  { name: "Umbrella", category: "Pharma", status: "active", value: 7300 },
  { name: "Soylent", category: "Food", status: "paused", value: 2500 },
  { name: "Stark Ind", category: "Defense", status: "active", value: 15200 },
  { name: "Wayne Ent", category: "Conglomerate", status: "active", value: 12000 },
  { name: "Hooli", category: "Software", status: "archived", value: 800 },
  { name: "Pied Piper", category: "Software", status: "active", value: 3400 },
  { name: "Vehement", category: "Capital", status: "paused", value: 5600 },
  { name: "Massive Dyn", category: "Research", status: "active", value: 8800 },
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const s = getValue<Row["status"]>();
      return (
        <Badge variant={s === "active" ? "default" : s === "paused" ? "secondary" : "outline"}>
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ getValue }) => (
      <span className="tabular-nums">${getValue<number>().toLocaleString()}</span>
    ),
  },
];

const meta: Meta<typeof DataTable<Row, unknown>> = {
  title: "Composites/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DataTable<Row, unknown>>;

/** Sortable, filterable, paginated. Resize the viewport below ~768px to see the
 * SAME table reflow to per-row stacked cards (one DOM tree, no h-scroll). */
export const Default: Story = {
  args: { columns, data, caption: "Companies" },
};

export const Empty: Story = {
  args: { columns, data: [], emptyState: "No companies match your filters." },
};

/** The same DataTable under a WARM vs SHARP token skin (reskins via :root). */
export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div
        style={{
          ["--primary" as string]: "oklch(0.62 0.16 40)",
          ["--accent" as string]: "oklch(0.85 0.09 70)",
          ["--radius" as string]: "1rem",
          ["--background" as string]: "oklch(0.99 0.01 70)",
          padding: "1rem",
          background: "var(--background)",
        }}
      >
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Warm</h3>
        <DataTable columns={columns} data={data.slice(0, 4)} enablePagination={false} caption="Warm" />
      </div>
      <div
        style={{
          ["--primary" as string]: "oklch(0.5 0.16 264)",
          ["--accent" as string]: "oklch(0.7 0.12 200)",
          ["--radius" as string]: "0.125rem",
          ["--background" as string]: "oklch(0.99 0.004 264)",
          padding: "1rem",
          background: "var(--background)",
        }}
      >
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Sharp</h3>
        <DataTable columns={columns} data={data.slice(0, 4)} enablePagination={false} caption="Sharp" />
      </div>
    </div>
  ),
};

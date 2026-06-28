import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

interface Row {
  name: string;
  category: string;
  status: "active" | "paused" | "archived";
  value: number;
}

/** Status as a CALM, equal-weight pill differentiated by a muted hue dot (not a
 * solid→tint→ghost prominence ladder) — categorical identity, anti-ranking (C5b). */
/* Calm, well-separated identity hues that avoid landing on red for any status
 * (anti-ranking — a status is categorical, not a verdict). */
const STATUS_HUE: Record<Row["status"], number> = { active: 0, paused: 150, archived: 240 };
function StatusPill({ status }: { status: Row["status"] }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 font-medium"
      style={{
        fontSize: "var(--text-small)",
        borderRadius: "var(--radius-sm)",
        background: "color-mix(in oklch, var(--muted) 55%, var(--card))",
        color: "var(--foreground)",
        border: "1px solid color-mix(in oklch, var(--border) 70%, transparent)",
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: `hsl(from var(--primary) calc(h + ${STATUS_HUE[status]}) calc(s * 0.5) calc(l * 0.82))` }}
      />
      {status}
    </span>
  );
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
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusPill status={getValue<Row["status"]>()} />,
  },
  {
    accessorKey: "value",
    header: "Value",
    meta: { align: "right" },
    cell: ({ getValue }) => (
      <span className="tabular-nums font-semibold text-foreground">
        <span className="font-normal text-muted-foreground">$</span>
        {getValue<number>().toLocaleString()}
      </span>
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

/** Efficient dense grid — sticky header, sortable columns, hairline rows, numeric
 * column right-aligned (via column.meta.align), a search + result-count toolbar,
 * and a refined footer. Resize below ~768px to see the SAME table reflow to
 * per-RECORD cards (one DOM tree). */
export const Default: Story = {
  args: { columns, data, caption: "Companies" },
};

/** With a toolbar actions slot (e.g. Export) on the right of the search row. */
export const WithToolbarActions: Story = {
  args: {
    columns,
    data,
    caption: "Companies",
    toolbarActions: (
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 px-3 font-medium"
        style={{
          fontSize: "var(--text-small)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--foreground)",
        }}
      >
        Export
      </button>
    ),
  },
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

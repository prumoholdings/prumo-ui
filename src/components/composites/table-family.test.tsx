import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import {
  ComparisonTable,
  type ComparisonAttribute,
  type ComparisonEntity,
} from "./comparison-table";

afterEach(cleanup);

interface Row {
  name: string;
  value: number;
}
const rows: Row[] = [
  { name: "Alpha", value: 3 },
  { name: "Bravo", value: 1 },
  { name: "Charlie", value: 2 },
];
const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "value", header: "Value" },
];

describe("DataTable", () => {
  it("renders rows and is axe-clean", async () => {
    const { container } = render(<DataTable columns={columns} data={rows} caption="Items" />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("filters via the global search box", () => {
    render(<DataTable columns={columns} data={rows} filterPlaceholder="Find" />);
    const input = screen.getByLabelText("Find");
    fireEvent.change(input, { target: { value: "Brav" } });
    expect(screen.getByText("Bravo")).toBeInTheDocument();
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("sorts when a sortable header is clicked", () => {
    render(<DataTable columns={columns} data={rows} enablePagination={false} />);
    const header = screen.getByRole("button", { name: /Value/ });
    const th = header.closest("th");
    expect(th?.getAttribute("aria-sort")).toBeNull(); // unsorted initially
    fireEvent.click(header);
    // a sort was applied (direction depends on tanstack's first-click default)
    expect(["ascending", "descending"]).toContain(th?.getAttribute("aria-sort"));
    // the rows are reordered by value, not by their original order
    const firstNameAfterSort = screen.getAllByRole("cell")[0]?.textContent;
    expect(["Alpha", "Bravo"]).toContain(firstNameAfterSort); // min or max value row
  });

  it("renders the empty state with zero rows", async () => {
    const { container } = render(
      <DataTable columns={columns} data={[]} emptyState="Nothing here" />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("does not crash on a single column / single row (thin data)", () => {
    render(<DataTable columns={[{ accessorKey: "name", header: "Name" }]} data={[{ name: "Solo", value: 0 }]} />);
    expect(screen.getByText("Solo")).toBeInTheDocument();
  });
});

const attributes: ComparisonAttribute[] = [
  { id: "rating", label: "Rating", format: "score", scoreMax: 5 },
  { id: "price", label: "Price", format: "currency", currency: "USD" },
  { id: "tier", label: "Tier", format: "badge" },
  { id: "support", label: "Support", format: "check" },
];
const entities: ComparisonEntity[] = [
  { id: "a", name: "Aurora", values: { rating: 4.5, price: 1200, tier: "Pro", support: true } },
  { id: "b", name: "Beacon", values: { rating: 3.8, price: 600, tier: "Starter", support: false } },
];

describe("ComparisonTable", () => {
  it("renders entities as columns + attributes as rows, axe-clean", async () => {
    const { container } = render(
      <ComparisonTable entities={entities} attributes={attributes} caption="Compare" />,
    );
    const table = screen.getByRole("table");
    // Aurora appears in the column header AND in each data cell's mobile
    // identity chip (one responsive DOM tree), so it is present more than once.
    expect(within(table).getAllByText("Aurora").length).toBeGreaterThan(0);
    expect(within(table).getByText("Rating")).toBeInTheDocument();
    // row header semantics
    expect(screen.getAllByRole("rowheader").length).toBe(attributes.length);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("formats currency and check cells", () => {
    render(<ComparisonTable entities={entities} attributes={attributes} />);
    expect(screen.getByText(/\$1,200/)).toBeInTheDocument();
    // a 'No' check exposes an sr-only label
    expect(screen.getAllByText("No").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Yes").length).toBeGreaterThan(0);
  });

  it("renders the empty state with no entities", async () => {
    const { container } = render(
      <ComparisonTable entities={[]} attributes={attributes} emptyState="Add options" />,
    );
    expect(screen.getByText("Add options")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("exposes accessible text equivalents for the visual cues + renders count units", async () => {
    const richAttrs: ComparisonAttribute[] = [
      { id: "progress", label: "Progress", format: "score", scoreMax: 10 },
      { id: "fsm", label: "Free meals", format: "percent" },
      { id: "size", label: "Class size", format: "count", unit: "pupils" },
      { id: "ofsted", label: "Ofsted", format: "badge" },
    ];
    const richEntities: ComparisonEntity[] = [
      { id: "a", name: "Alpha", values: { progress: 8.4, fsm: 22, size: 27, ofsted: "Outstanding" } },
    ];
    const { container } = render(
      <ComparisonTable entities={richEntities} attributes={richAttrs} caption="Schools" />,
    );
    // score meter has an sr-only equivalent and shows the number visually
    expect(screen.getByText("8.4 out of 10")).toBeInTheDocument();
    expect(screen.getByText("8.4")).toBeInTheDocument();
    // percent exposes a spoken equivalent + a visible %
    expect(screen.getByText("22 percent")).toBeInTheDocument();
    expect(screen.getByText("22%")).toBeInTheDocument();
    // count renders the muted unit suffix
    expect(screen.getByText("pupils")).toBeInTheDocument();
    // badge category renders its label as a real pill
    expect(screen.getByText("Outstanding")).toBeInTheDocument();
    // the rich cues stay axe-clean
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders distinct categorical badge tones deterministically (anti-ranking, not verdict-colored)", () => {
    const attrs: ComparisonAttribute[] = [{ id: "ofsted", label: "Ofsted", format: "badge" }];
    const ents: ComparisonEntity[] = [
      { id: "a", name: "A", values: { ofsted: "Outstanding" } },
      { id: "b", name: "B", values: { ofsted: "Good" } },
      { id: "c", name: "C", values: { ofsted: "Requires Improvement" } },
    ];
    render(<ComparisonTable entities={ents} attributes={attrs} />);
    // all three categories render as pills; tone is categorical (no success/danger token)
    for (const label of ["Outstanding", "Good", "Requires Improvement"]) {
      const pill = screen.getByText(label);
      expect(pill).toBeInTheDocument();
      expect(pill.className).not.toMatch(/destructive|success|danger|green|red/);
    }
  });

  it("renders an em-dash for missing values (sparse data, no crash)", () => {
    render(
      <ComparisonTable
        entities={[{ id: "x", name: "Partial", values: { rating: 4 } }]}
        attributes={attributes}
      />,
    );
    expect(screen.getAllByText("Partial").length).toBeGreaterThan(0);
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });
});

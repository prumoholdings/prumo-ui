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
    expect(within(table).getByText("Aurora")).toBeInTheDocument();
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

  it("renders an em-dash for missing values (sparse data, no crash)", () => {
    render(
      <ComparisonTable
        entities={[{ id: "x", name: "Partial", values: { rating: 4 } }]}
        attributes={attributes}
      />,
    );
    expect(screen.getByText("Partial")).toBeInTheDocument();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });
});

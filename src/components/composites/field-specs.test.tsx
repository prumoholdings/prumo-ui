import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { CardCollection } from "./card-collection";
import { DataTable } from "./data-table";
import { PageHeader } from "./page-header";
import { FilterBar } from "./filter-bar";
import { DetailView } from "./detail-view";
import { Board } from "./board";
import { EmptyState } from "./empty-state";
import type { CardSpec, ColumnSpec } from "./field-specs";

afterEach(cleanup);

/**
 * Phase 65 — the data-driven field-specs: a pure-DATA ScreenPlan must be able to
 * drive every function/node-prop composite through declarative props alone. These
 * tests assert the DATA path renders, and that a function/node prop still WINS when
 * both are present (backward-compat precedence).
 */

const schools = [
  { id: "a", name: "Greenfield Primary", area: "Cascais", places: 24, fee: 8200, phase: "Primary" },
  { id: "b", name: "Riverside School", area: "Sintra", places: 12, fee: 11000, phase: "Secondary" },
];

describe("CardCollection.card (data-driven)", () => {
  const card: CardSpec = {
    titleKey: "name",
    subtitleKey: "area",
    fields: [
      { label: "Places", key: "places" },
      { label: "Fee", key: "fee" },
    ],
    badges: [{ key: "phase", tone: "accent" }],
    actions: [{ label: "View", variant: "outline" }],
  };

  it("renders one card per item from pure data, axe-clean", async () => {
    const { container } = render(<CardCollection items={schools} card={card} aria-label="Schools" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Greenfield Primary")).toBeInTheDocument();
    expect(screen.getByText("Cascais")).toBeInTheDocument();
    expect(screen.getAllByText("Places").length).toBe(2);
    expect(screen.getAllByText("Primary").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("button", { name: "View" }).length).toBe(2);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("lets renderItem win when both are present (precedence)", () => {
    render(
      <CardCollection
        items={schools}
        card={card}
        renderItem={(i) => <article>FN:{(i as { name: string }).name}</article>}
      />,
    );
    expect(screen.getByText("FN:Greenfield Primary")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "View" })).not.toBeInTheDocument();
  });
});

describe("DataTable.columnsSpec (data-driven)", () => {
  const columnsSpec: ColumnSpec[] = [
    { key: "name", header: "School" },
    { key: "places", header: "Places", format: "number" },
    { key: "fee", header: "Annual fee", format: "currency", currency: "EUR" },
    { key: "phase", header: "Phase", format: "badge" },
  ];

  it("builds columns + formatted cells from pure data", () => {
    render(<DataTable data={schools} columnsSpec={columnsSpec} caption="Schools" />);
    expect(screen.getByRole("columnheader", { name: /School/ })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Annual fee/ })).toBeInTheDocument();
    // currency-formatted (EUR) and present in the grid
    expect(screen.getByText(/€\s?8,200|€8,200/)).toBeInTheDocument();
    expect(screen.getByText("Greenfield Primary")).toBeInTheDocument();
  });

  it("lets columns win when both are present (precedence)", () => {
    render(
      <DataTable
        data={schools}
        columnsSpec={columnsSpec}
        columns={[{ accessorKey: "name", header: "EXPLICIT" }]}
      />,
    );
    expect(screen.getByRole("columnheader", { name: /EXPLICIT/ })).toBeInTheDocument();
    expect(screen.queryByRole("columnheader", { name: /Annual fee/ })).not.toBeInTheDocument();
  });
});

describe("PageHeader.actionSpecs (data-driven)", () => {
  it("renders declarative actions as buttons", () => {
    render(
      <PageHeader
        title="Schools"
        actionSpecs={[
          { label: "Filters", variant: "outline" },
          { label: "Compare", icon: "GitCompare" },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Compare" })).toBeInTheDocument();
  });

  it("lets actions (node) win over actionSpecs", () => {
    render(
      <PageHeader
        title="Schools"
        actions={<button type="button">NODE</button>}
        actionSpecs={[{ label: "DATA" }]}
      />,
    );
    expect(screen.getByRole("button", { name: "NODE" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "DATA" })).not.toBeInTheDocument();
  });
});

describe("FilterBar.filterSpecs (data-driven)", () => {
  it("renders declarative search + select controls", () => {
    render(
      <FilterBar
        aria-label="Filter schools"
        filterSpecs={[
          { id: "q", kind: "search", label: "Search schools", placeholder: "Search…" },
          {
            id: "area",
            kind: "select",
            label: "Area",
            options: [{ value: "cascais", label: "Cascais" }],
          },
        ]}
      />,
    );
    expect(screen.getByRole("textbox", { name: "Search schools" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Area" })).toBeInTheDocument();
  });
});

describe("DetailView.asideSpec (data-driven)", () => {
  it("renders a declarative aside card", () => {
    render(
      <DetailView
        aria-label="School detail"
        sections={[{ id: "s1", title: "Overview", facts: [{ label: "Area", value: "Cascais" }] }]}
        asideSpec={{
          title: "At a glance",
          facts: [{ label: "Places", value: "24" }],
          actions: [{ label: "Enquire" }],
        }}
      />,
    );
    expect(screen.getByText("At a glance")).toBeInTheDocument();
    expect(screen.getByText("Places")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enquire" })).toBeInTheDocument();
  });
});

describe("Board.cardSpec (data-driven)", () => {
  it("renders declarative cards in columns", () => {
    render(
      <Board
        aria-label="Pipeline"
        columns={[
          { id: "todo", title: "To do", cards: [{ id: "1", name: "Tour Greenfield" }] },
          { id: "done", title: "Done", cards: [{ id: "2", name: "Tour Riverside" }] },
        ]}
        cardSpec={{ titleKey: "name" }}
      />,
    );
    expect(screen.getByText("Tour Greenfield")).toBeInTheDocument();
    expect(screen.getByText("Tour Riverside")).toBeInTheDocument();
  });
});

describe("EmptyState iconName/actionSpec (data-driven)", () => {
  it("resolves a lucide icon name + renders a declarative CTA", () => {
    const { container } = render(
      <EmptyState
        iconName="SearchX"
        title="No schools found"
        description="Try widening your filters."
        actionSpec={{ label: "Clear filters" }}
      />,
    );
    expect(screen.getByText("No schools found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("unknown icon name degrades gracefully (no crash, no icon)", () => {
    render(<EmptyState iconName="ThisIconDoesNotExist" title="Empty" />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });
});

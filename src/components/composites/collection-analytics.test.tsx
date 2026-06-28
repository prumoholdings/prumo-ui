import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { CardCollection } from "./card-collection";
import { StatDashboard } from "./stat-dashboard";

afterEach(cleanup);

interface Item {
  id: string;
  title: string;
}
const items: Item[] = [
  { id: "a", title: "Alpha" },
  { id: "b", title: "Bravo" },
  { id: "c", title: "Charlie" },
];
const renderItem = (i: Item) => <article>{i.title}</article>;

describe("CardCollection", () => {
  it("renders a list of items axe-clean", async () => {
    const { container } = render(
      <CardCollection items={items} renderItem={renderItem} getKey={(i) => i.id} aria-label="Catalog" />,
    );
    expect(screen.getByRole("list", { name: "Catalog" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(["grid", "list", "masonry"] as const)("renders the %s layout", (layout) => {
    render(<CardCollection items={items} renderItem={renderItem} getKey={(i) => i.id} layout={layout} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders the empty state with zero items", async () => {
    const { container } = render(
      <CardCollection items={[]} renderItem={renderItem} emptyState="No results." />,
    );
    expect(screen.getByText("No results.")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("does not crash with a minimal item shape", () => {
    render(<CardCollection items={[{ id: "x", title: "Solo" }]} renderItem={renderItem} getKey={(i) => i.id} />);
    expect(screen.getByText("Solo")).toBeInTheDocument();
  });
});

const kpis = [
  { label: "Revenue", value: "$10k", deltaPct: 5.2, hint: "MoM" },
  { label: "Users", value: "1,200", deltaPct: -2.1 },
];

describe("StatDashboard", () => {
  it("renders KPI cards with deltas axe-clean (no chart)", async () => {
    const { container } = render(<StatDashboard kpis={kpis} aria-label="Metrics" />);
    expect(screen.getByRole("region", { name: "Metrics" })).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$10k")).toBeInTheDocument();
    // delta direction is exposed to AT (factual, neutral — not good/bad)
    expect(screen.getByText("up from the previous period")).toBeInTheDocument();
    expect(screen.getByText("down from the previous period")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the empty state with no kpis and no chart", async () => {
    const { container } = render(<StatDashboard kpis={[]} emptyState="No metrics." />);
    expect(screen.getByText("No metrics.")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders a chart container without crashing", () => {
    render(
      <StatDashboard
        kpis={kpis}
        chart={{
          kind: "bar",
          index: "month",
          categories: ["Revenue"],
          title: "Monthly",
          data: [
            { month: "Jan", Revenue: 10 },
            { month: "Feb", Revenue: 14 },
          ],
        }}
      />,
    );
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });
});

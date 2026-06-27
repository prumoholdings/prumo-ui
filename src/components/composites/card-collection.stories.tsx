import type { Meta, StoryObj } from "@storybook/react";
import { CardCollection } from "./card-collection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface Item {
  id: string;
  title: string;
  blurb: string;
  tag: string;
}

const items: Item[] = Array.from({ length: 9 }).map((_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
  blurb: "A generic catalog entry rendered through the caller's card template.",
  tag: ["New", "Popular", "Sale"][i % 3],
}));

const renderItem = (item: Item) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center justify-between gap-2">
        <CardTitle>{item.title}</CardTitle>
        <Badge variant="secondary">{item.tag}</Badge>
      </div>
      <CardDescription>{item.blurb}</CardDescription>
    </CardHeader>
    <CardContent style={{ fontSize: "var(--text-small)" }}>Body content.</CardContent>
  </Card>
);

const meta: Meta<typeof CardCollection<Item>> = {
  title: "Composites/CardCollection",
  component: CardCollection,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof CardCollection<Item>>;

export const Grid: Story = {
  args: { items, renderItem, getKey: (i) => i.id, layout: "grid", "aria-label": "Catalog" },
};

export const List: Story = {
  args: { items: items.slice(0, 4), renderItem, getKey: (i) => i.id, layout: "list" },
};

export const Masonry: Story = {
  args: { items, renderItem, getKey: (i) => i.id, layout: "masonry" },
};

export const Empty: Story = {
  args: { items: [], renderItem, emptyState: "No results match your search." },
};

export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--radius" as string]: "1rem", ["--secondary" as string]: "oklch(0.92 0.04 70)", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Warm</h3>
        <CardCollection items={items.slice(0, 3)} renderItem={renderItem} getKey={(i) => i.id} />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--radius" as string]: "0.125rem", ["--secondary" as string]: "oklch(0.93 0.02 264)", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Sharp</h3>
        <CardCollection items={items.slice(0, 3)} renderItem={renderItem} getKey={(i) => i.id} />
      </div>
    </div>
  ),
};

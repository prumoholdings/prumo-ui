import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Plus } from "lucide-react";
import { FilterBar, type ActiveFilter } from "./filter-bar";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const meta: Meta<typeof FilterBar> = {
  title: "Composites/FilterBar",
  component: FilterBar,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

/** A schools DISCOVERY filter bar — search + facet adders + removable active-filter
 * chips + a neutral result count + a neutral sort (distance/name, never a quality
 * rank). Anti-ranking: chips are categorical facts. */
function Demo() {
  const [search, setSearch] = React.useState("");
  const [chips, setChips] = React.useState([
    { id: "phase", name: "Phase: Primary" },
    { id: "area", name: "Area: Camden" },
    { id: "sen", name: "SEN support" },
  ]);
  const active: ActiveFilter[] = chips.map((c) => ({
    id: c.id,
    label: c.name,
    name: c.name,
    onRemove: () => setChips((cs) => cs.filter((x) => x.id !== c.id)),
  }));
  const adder = (label: string) => (
    <Button variant="outline" size="sm" className="gap-1">
      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Button>
  );
  return (
    <FilterBar
      aria-label="Filter schools"
      search={{ value: search, onChange: setSearch, placeholder: "Search schools…" }}
      filters={
        <>
          {adder("Phase")}
          {adder("Area")}
          {adder("Facilities")}
          {adder("More")}
        </>
      }
      activeFilters={active}
      onClearAll={() => setChips([])}
      resultCount={`${chips.length ? 8 : 12} schools`}
      sort={
        <Select defaultValue="distance">
          <SelectTrigger className="h-9 min-h-0 w-[150px]" aria-label="Sort by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Sort: Distance</SelectItem>
            <SelectItem value="name">Sort: Name (A–Z)</SelectItem>
            <SelectItem value="pupils">Sort: Class size</SelectItem>
          </SelectContent>
        </Select>
      }
      divider
    />
  );
}

export const Default: Story = { render: () => <Demo /> };

/** No active filters — just search + facet adders + count. */
export const NoActiveFilters: Story = {
  args: {
    "aria-label": "Filter schools",
    search: { value: "", onChange: () => {}, placeholder: "Search schools…" },
    filters: (
      <>
        <Button variant="outline" size="sm">Phase</Button>
        <Button variant="outline" size="sm">Area</Button>
      </>
    ),
    resultCount: "12 schools",
  },
};

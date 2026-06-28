import type { Meta, StoryObj } from "@storybook/react";
import { Search, Inbox, GitCompare } from "lucide-react";
import { EmptyState } from "./empty-state";
import { Button } from "../ui/button";

const meta: Meta<typeof EmptyState> = {
  title: "Composites/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

/** No search/filter results — calm, with a single clear recovery action. */
export const NoResults: Story = {
  render: () => (
    <EmptyState
      icon={<Search aria-hidden="true" />}
      title="No schools match your filters"
      description="Try removing a filter or widening the area to see more results."
      action={<Button variant="outline">Clear filters</Button>}
    />
  ),
};

/** A genuinely empty collection (first-run) — invites the first action. */
export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={<Inbox aria-hidden="true" />}
      title="No saved schools yet"
      description="Schools you shortlist will appear here so you can compare them later."
      action={<Button>Browse schools</Button>}
    />
  ),
};

/** The compact size — for inline-in-card empties. */
export const Compact: Story = {
  render: () => (
    <div style={{ maxWidth: "28rem", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", background: "var(--card)" }}>
      <EmptyState
        size="sm"
        icon={<GitCompare aria-hidden="true" />}
        title="Nothing to compare"
        description="Add two or more schools to see them side by side."
      />
    </div>
  ),
};

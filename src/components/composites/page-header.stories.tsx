import type { Meta, StoryObj } from "@storybook/react";
import { Users, MapPin, Info, ChevronRight } from "lucide-react";
import { PageHeader } from "./page-header";
import { Button } from "../ui/button";

const meta: Meta<typeof PageHeader> = {
  title: "Composites/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

const Chevron = () => <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />;

/** A school DETAIL page header (the "decide" step) — breadcrumb → editorial title
 * → description → a SOURCED meta strip, with Compare / Book-a-tour actions. */
export const Default: Story = {
  args: {
    breadcrumb: (
      <span className="inline-flex items-center gap-1.5">
        Schools <Chevron /> Camden <Chevron /> <span className="text-foreground">Greenfields Primary</span>
      </span>
    ),
    title: "Greenfields Primary",
    description:
      "A calm, well-resourced community primary with on-site SEN provision and a strong outdoor-learning programme.",
    meta: (
      <>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />412 pupils
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />Camden · 0.4 mi
        </span>
        <span>Ages 4–11</span>
        <span className="inline-flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />Sourced: Ofsted · DfE performance tables
        </span>
      </>
    ),
    actions: (
      <>
        <Button variant="outline">Compare</Button>
        <Button>Book a tour</Button>
      </>
    ),
  },
};

/** The Settings variant — a stacked title + description, no actions (Linear/Vercel). */
export const Settings: Story = {
  args: {
    title: "Workspace",
    description: "Manage your workspace settings and the schools you're comparing.",
    as: "h2",
  },
};

/** Title + single primary action, no breadcrumb/meta. */
export const TitleAndAction: Story = {
  args: {
    title: "Saved schools",
    description: "Schools you've shortlisted.",
    actions: <Button>Add a school</Button>,
  },
};

export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--radius" as string]: "1rem", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Warm</h3>
        <PageHeader title="Greenfields Primary" description="A community primary in Camden." actions={<Button>Book a tour</Button>} />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--radius" as string]: "0.125rem", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Sharp</h3>
        <PageHeader title="Greenfields Primary" description="A community primary in Camden." actions={<Button>Book a tour</Button>} />
      </div>
    </div>
  ),
};

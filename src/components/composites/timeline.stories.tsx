import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, CalendarClock, MessageSquare, FileText } from "lucide-react";
import { Timeline } from "./timeline";

const meta: Meta<typeof Timeline> = {
  title: "Composites/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

/** A school-application activity feed — neutral nodes, factual entries. */
export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: "34rem" }}>
      <Timeline
        aria-label="Application activity"
        entries={[
          { id: "1", icon: <MessageSquare aria-hidden="true" />, title: "Message from the school", timestamp: "3h ago", description: "Please bring proof of address to your visit." },
          { id: "2", icon: <CalendarClock aria-hidden="true" />, title: "Tour booked", timestamp: "Yesterday", description: "Wednesday 10:00am with the admissions office." },
          { id: "3", icon: <CheckCircle2 aria-hidden="true" />, title: "Application submitted", timestamp: "2 days ago", description: "Your application to Greenfields Primary was received." },
          { id: "4", icon: <FileText aria-hidden="true" />, title: "Draft started", timestamp: "5 days ago" },
        ]}
      />
    </div>
  ),
};

/** Plain dots (no icons). */
export const Dots: Story = {
  render: () => (
    <div style={{ maxWidth: "34rem" }}>
      <Timeline
        aria-label="History"
        entries={[
          { id: "1", title: "Catchment updated", timestamp: "Jun 2026" },
          { id: "2", title: "Ofsted report published", timestamp: "Mar 2024" },
          { id: "3", title: "School census recorded", timestamp: "Jan 2025" },
        ]}
      />
    </div>
  ),
};

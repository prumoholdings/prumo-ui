import type { Meta, StoryObj } from "@storybook/react";
import { Users, MapPin, Info, ChevronRight } from "lucide-react";
import { DetailView, type DetailSection } from "./detail-view";
import { PageHeader } from "./page-header";
import { Button } from "../ui/button";

const meta: Meta<typeof DetailView> = {
  title: "Composites/DetailView",
  component: DetailView,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DetailView>;

const Chevron = () => <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />;

const header = (
  <PageHeader
    breadcrumb={
      <span className="inline-flex items-center gap-1.5">
        Schools <Chevron /> Camden <Chevron /> <span className="text-foreground">Greenfields Primary</span>
      </span>
    }
    title="Greenfields Primary"
    description="A calm, well-resourced community primary with on-site SEN provision and a strong outdoor-learning programme."
    meta={
      <>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />412 pupils
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />Camden · 0.4 mi
        </span>
        <span>Ages 4–11</span>
      </>
    }
    actions={
      <>
        <Button variant="outline">Compare</Button>
        <Button>Book a tour</Button>
      </>
    }
    divider={false}
  />
);

const media = (
  <div
    aria-hidden="true"
    style={{
      aspectRatio: "16 / 6",
      borderRadius: "var(--radius-lg)",
      background:
        "linear-gradient(135deg, hsl(from var(--primary) h calc(s * 0.45) calc(l * 0.92)), hsl(from var(--primary) calc(h + 40) calc(s * 0.4) calc(l * 0.72)))",
    }}
  />
);

const sections: DetailSection[] = [
  {
    id: "quality",
    title: "Quality & outcomes",
    description: "Inspection category and measured progress — shown as facts, not a ranking.",
    facts: [
      { label: "Ofsted rating", value: "Outstanding" },
      { label: "Latest inspection", value: "March 2024" },
      { label: "Progress score", value: "8.4 / 10" },
      { label: "Attendance", value: "96.2%" },
    ],
  },
  {
    id: "intake",
    title: "Intake & access",
    facts: [
      { label: "Pupils", value: "412" },
      { label: "Average class size", value: "27" },
      { label: "Free school meals", value: "22% of pupils" },
      { label: "Catchment distance", value: "0.4 mi from postcode" },
    ],
  },
  {
    id: "facilities",
    title: "Facilities",
    facts: [
      { label: "SEN support", value: "On-site provision" },
      { label: "Breakfast club", value: "Yes — from 7:45am" },
      { label: "After-school care", value: "Yes — to 6pm" },
      { label: "Outdoor space", value: "Generous grounds + forest school" },
    ],
  },
];

const aside = (
  <div
    style={{
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border)",
      background: "var(--card)",
      boxShadow: "var(--shadow-sm)",
      padding: "1.25rem",
    }}
  >
    <h3 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body)" }}>
      Visit this school
    </h3>
    <p className="mt-1 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
      Tours run weekday mornings and one Saturday a month.
    </p>
    <div className="mt-4 flex flex-col gap-2">
      <Button className="w-full">Book a tour</Button>
      <Button variant="outline" className="w-full">Add to compare</Button>
    </div>
  </div>
);

const source = (
  <span className="inline-flex items-center gap-1.5">
    <Info className="h-3.5 w-3.5" aria-hidden="true" />
    Sourced: Ofsted reports · DfE performance tables · school census 2025
  </span>
);

/** A school DETAIL page (the "decide" step) — PageHeader + a token hero + grouped
 * SOURCED fact sections + a sticky actions aside + a provenance footer. No score,
 * no grade, no "recommended" — facts to weigh. */
export const Default: Story = {
  render: () => (
    <DetailView header={header} media={media} sections={sections} aside={aside} source={source} aria-label="Greenfields Primary" />
  ),
};

/** Without the aside — full-width sections. */
export const NoAside: Story = {
  render: () => <DetailView header={header} sections={sections} source={source} aria-label="Greenfields Primary" />,
};

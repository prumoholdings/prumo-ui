import type { Meta, StoryObj } from "@storybook/react";
import { School, CalendarDays } from "lucide-react";
import { Board, type BoardColumn } from "./board";

/* A believable ACTION board — a school ADMISSIONS pipeline (move applicants
 * forward through stages). The demo card models the premium Linear-style card:
 * a quiet reference + owner monogram, a display-font name, a sourced school line,
 * and factual chips. Token-only; anti-ranking (no "hot lead" / scoring). */
interface Applicant {
  id: string;
  ref: string;
  family: string;
  school: string;
  year: string;
  when?: string;
  owner: string;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}
function ownerHue(name: string): number {
  return (hashString(name) % 12) * 30;
}

function OwnerChip({ name }: { name: string }) {
  const hue = ownerHue(name);
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      aria-hidden="true"
      title={name}
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        fontSize: "0.6rem",
        background: `color-mix(in oklch, hsl(from var(--primary) calc(h + ${hue}) calc(s * 0.5) l) 22%, var(--card))`,
        color: `hsl(from var(--primary) calc(h + ${hue}) calc(s * 0.6) calc(l - 22))`,
      }}
    >
      {initials}
    </span>
  );
}

function AdmissionCard(card: Applicant) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <span className="tabular-nums text-muted-foreground" style={{ fontSize: "0.7rem", letterSpacing: "0.03em" }}>{card.ref}</span>
        <OwnerChip name={card.owner} />
      </div>
      <h4 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body)", lineHeight: 1.2 }}>
        {card.family}
      </h4>
      <p className="inline-flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
        <School className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {card.school}
      </p>
      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span
          className="inline-flex items-center px-2 py-0.5 font-medium"
          style={{
            fontSize: "var(--text-small)",
            borderRadius: "var(--radius-sm)",
            background: "color-mix(in oklch, var(--muted) 55%, var(--card))",
            color: "var(--foreground)",
          }}
        >
          {card.year}
        </span>
        {card.when && (
          <span className="inline-flex items-center gap-1 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {card.when}
          </span>
        )}
      </div>
    </div>
  );
}

const columns: BoardColumn<Applicant>[] = [
  {
    id: "enquiry",
    title: "Enquiry",
    cards: [
      { id: "a1", ref: "ADM-128", family: "The Okafor family", school: "Greenfields Primary", year: "Reception", owner: "Priya Shah" },
      { id: "a2", ref: "ADM-131", family: "The Bianchi family", school: "St Mary's CE Primary", year: "Year 3", owner: "Tom Reed" },
      { id: "a3", ref: "ADM-134", family: "The Adeyemi family", school: "Riverside Academy", year: "Reception", owner: "Priya Shah" },
    ],
  },
  {
    id: "tour",
    title: "Tour booked",
    cards: [
      { id: "b1", ref: "ADM-119", family: "The Nguyen family", school: "Greenfields Primary", year: "Year 1", when: "12 Sep", owner: "Tom Reed" },
      { id: "b2", ref: "ADM-122", family: "The Kowalski family", school: "Oakwood Primary", year: "Reception", when: "15 Sep", owner: "Amara Bello" },
    ],
  },
  {
    id: "applied",
    title: "Applied",
    cards: [
      { id: "c1", ref: "ADM-104", family: "The Hassan family", school: "The Willows School", year: "Year 2", when: "Sent 2 Sep", owner: "Amara Bello" },
      { id: "c2", ref: "ADM-108", family: "The Costa family", school: "St Mary's CE Primary", year: "Reception", when: "Sent 4 Sep", owner: "Priya Shah" },
      { id: "c3", ref: "ADM-111", family: "The Müller family", school: "Riverside Academy", year: "Year 4", when: "Sent 5 Sep", owner: "Tom Reed" },
    ],
  },
  {
    id: "offered",
    title: "Offered",
    cards: [
      { id: "d1", ref: "ADM-091", family: "The Johansson family", school: "Greenfields Primary", year: "Reception", when: "Reply by 20 Sep", owner: "Amara Bello" },
    ],
  },
];

const meta: Meta<typeof Board<Applicant>> = {
  title: "Composites/Board",
  component: Board,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Board<Applicant>>;

/** Admissions pipeline — flat columns, quiet header (title + muted count),
 * premium applicant cards, keyboard move buttons. */
export const Default: Story = {
  args: { columns, renderCard: AdmissionCard, "aria-label": "Admissions pipeline" },
};

/** With the ＋ add-card affordance and keyboard move buttons wired. */
export const Interactive: Story = {
  args: {
    columns,
    renderCard: AdmissionCard,
    onMoveCard: () => {},
    onAddCard: () => {},
    "aria-label": "Admissions pipeline",
  },
};

export const Empty: Story = {
  args: { columns: [], renderCard: AdmissionCard, emptyState: "No pipeline stages configured." },
};

/** WARM vs SHARP token skin — the same board re-skins from :root. */
export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--radius" as string]: "1rem", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Warm</h3>
        <Board columns={columns.slice(0, 2)} renderCard={AdmissionCard} />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--radius" as string]: "0.125rem", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Sharp</h3>
        <Board columns={columns.slice(0, 2)} renderCard={AdmissionCard} />
      </div>
    </div>
  ),
};

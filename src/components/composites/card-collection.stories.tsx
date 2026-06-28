import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MapPin, Users, Navigation } from "lucide-react";
import { CardCollection } from "./card-collection";

/* A premium DISCOVERY card (engagement archetype), modelled on the editorial
 * real-estate/listing bar (Luxora/Airbnb) but ANTI-RANKING: a token duotone
 * image, a neutral frosted category pill, a display-font title, and a FACTUAL
 * metadata row (pupils / distance / age-range) — NO star ratings, NO
 * "popular/favorite/top-rated" signals. Token-only; re-skins from :root. */
interface School {
  id: string;
  name: string;
  phase: string;
  area: string;
  pupils: number;
  distance: string;
  ages: string;
  blurb: string;
}

const schools: School[] = [
  { id: "greenfields", name: "Greenfields Primary", phase: "Community", area: "Camden", pupils: 412, distance: "0.4 mi", ages: "Ages 4–11", blurb: "A calm, well-resourced primary with on-site SEN provision and a strong outdoor-learning programme." },
  { id: "stmarys", name: "St Mary's CE Primary", phase: "Voluntary aided", area: "Islington", pupils: 268, distance: "0.6 mi", ages: "Ages 4–11", blurb: "A small church-affiliated school known for its music curriculum and breakfast club." },
  { id: "riverside", name: "Riverside Academy", phase: "Academy", area: "Hackney", pupils: 540, distance: "0.8 mi", ages: "Ages 3–11", blurb: "Part of a multi-academy trust with a nursery, extended hours and a focus on early reading." },
  { id: "oakwood", name: "Oakwood Primary", phase: "Community", area: "Haringey", pupils: 330, distance: "1.1 mi", ages: "Ages 4–11", blurb: "A neighbourhood school with generous grounds and a long-running forest-school partnership." },
  { id: "willows", name: "The Willows School", phase: "Foundation", area: "Camden", pupils: 388, distance: "0.5 mi", ages: "Ages 5–11", blurb: "A foundation school with a strong arts intake and a well-established parent community." },
  { id: "brookfield", name: "Brookfield Junior", phase: "Academy", area: "Islington", pupils: 296, distance: "0.9 mi", ages: "Ages 7–11", blurb: "A junior school feeding three local secondaries, with on-site after-school clubs." },
  { id: "elmgrove", name: "Elm Grove Primary", phase: "Community", area: "Hackney", pupils: 451, distance: "1.3 mi", ages: "Ages 4–11", blurb: "A larger community primary with a dedicated SEN unit and a bilingual support programme." },
  { id: "parkside", name: "Parkside Primary", phase: "Voluntary aided", area: "Haringey", pupils: 240, distance: "1.6 mi", ages: "Ages 4–11", blurb: "A compact, oversubscribed school beside the common, known for its pastoral care." },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}
function hueFor(id: string): number {
  return (hashString(id) % 12) * 30;
}
function imageBg(id: string): string {
  const h = hueFor(id);
  return `linear-gradient(135deg, hsl(from var(--primary) calc(h + ${h}) calc(s * 0.45) calc(l * 0.92)), hsl(from var(--primary) calc(h + ${h + 45}) calc(s * 0.4) calc(l * 0.72)))`;
}

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.2rem 0.6rem",
  fontSize: "var(--text-small)",
  fontWeight: 600,
  borderRadius: "var(--radius-sm)",
  background: "color-mix(in oklch, var(--card) 86%, transparent)",
  color: "var(--foreground)",
  backdropFilter: "blur(4px)",
  border: "1px solid color-mix(in oklch, var(--border) 60%, transparent)",
};
const metaRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.9rem",
  paddingTop: "0.7rem",
  marginTop: "0.15rem",
  borderTop: "1px solid color-mix(in oklch, var(--border) 70%, transparent)",
  fontSize: "var(--text-small)",
  color: "var(--muted-foreground)",
};
const iconCell: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.3rem" };
const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-h3)",
  lineHeight: 1.15,
  fontWeight: 600,
  color: "var(--foreground)",
};
const blurbStyle: React.CSSProperties = {
  fontSize: "var(--text-small)",
  color: "var(--muted-foreground)",
  lineHeight: 1.45,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function MetaCells({ s }: { s: School }) {
  return (
    <div style={metaRow}>
      <span style={iconCell}><Users className="h-3.5 w-3.5" aria-hidden="true" />{s.pupils} pupils</span>
      <span style={iconCell}><Navigation className="h-3.5 w-3.5" aria-hidden="true" />{s.distance}</span>
      <span>{s.ages}</span>
    </div>
  );
}

/* Vertical discovery card (grid / masonry). */
function DiscoveryCard(s: School) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: imageBg(s.id) }}>
        <span style={{ ...pillStyle, position: "absolute", top: "0.75rem", left: "0.75rem" }}>{s.phase}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", padding: "1rem", flex: 1 }}>
        <h3 style={titleStyle}>{s.name}</h3>
        <p style={{ ...iconCell, fontSize: "var(--text-small)", color: "var(--muted-foreground)" }}>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {s.area}
        </p>
        <p style={{ ...blurbStyle, flex: 1 }}>{s.blurb}</p>
        <MetaCells s={s} />
      </div>
    </article>
  );
}

/* Horizontal discovery card (list). */
function DiscoveryListItem(s: School) {
  return (
    <article
      style={{
        display: "flex",
        gap: "1.1rem",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ position: "relative", flex: "0 0 clamp(8rem, 28%, 13rem)", alignSelf: "stretch", minHeight: "8rem", background: imageBg(s.id) }}>
        <span style={{ ...pillStyle, position: "absolute", top: "0.75rem", left: "0.75rem" }}>{s.phase}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", padding: "1rem 1.1rem 1rem 0", flex: 1, minWidth: 0 }}>
        <h3 style={titleStyle}>{s.name}</h3>
        <p style={{ ...iconCell, fontSize: "var(--text-small)", color: "var(--muted-foreground)" }}>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {s.area}
        </p>
        <p style={{ ...blurbStyle, flex: 1 }}>{s.blurb}</p>
        <MetaCells s={s} />
      </div>
    </article>
  );
}

const meta: Meta<typeof CardCollection<School>> = {
  title: "Composites/CardCollection",
  component: CardCollection,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof CardCollection<School>>;

/** Discovery feed — responsive auto-fit grid of premium, anti-ranking cards
 * (token image, factual metadata, no ratings). Subtle item-stagger on reveal. */
export const Grid: Story = {
  args: { items: schools, renderItem: DiscoveryCard, getKey: (s) => s.id, layout: "grid", minCardWidth: "18rem", "aria-label": "Discover schools" },
};

/** The same data as a stacked LIST of horizontal cards (image left). */
export const List: Story = {
  args: { items: schools.slice(0, 5), renderItem: DiscoveryListItem, getKey: (s) => s.id, layout: "list", "aria-label": "Discover schools" },
};

/** Masonry (CSS columns) — variable-height cards flow without a JS layout. */
export const Masonry: Story = {
  args: { items: schools, renderItem: DiscoveryCard, getKey: (s) => s.id, layout: "masonry", minCardWidth: "17rem", "aria-label": "Discover schools" },
};

export const Empty: Story = {
  args: { items: [], renderItem: DiscoveryCard, emptyState: "No schools match your search." },
};

/** The same collection under a WARM vs SHARP token skin (re-skins from :root). */
export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--radius" as string]: "1rem", ["--secondary" as string]: "oklch(0.92 0.04 70)", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Warm</h3>
        <CardCollection items={schools.slice(0, 3)} renderItem={DiscoveryCard} getKey={(s) => s.id} minCardWidth="16rem" />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--radius" as string]: "0.125rem", ["--secondary" as string]: "oklch(0.93 0.02 264)", padding: "1rem", background: "var(--background)" }}>
        <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "0.5rem" }}>Sharp</h3>
        <CardCollection items={schools.slice(0, 3)} renderItem={DiscoveryCard} getKey={(s) => s.id} minCardWidth="16rem" />
      </div>
    </div>
  ),
};

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * ComparisonTable — the INTELLIGENCE composite (the anti-ranking comparator). It
 * compares N entities across M attributes: entities are COLUMNS, attributes are
 * ROWS on desktop.
 *
 * ONE RESPONSIVE LAYOUT (no duplicate trees): a single matrix that REFLOWS via
 * CSS to per-ATTRIBUTE cards on small screens. Each attribute-row becomes a
 * titled card; every entity's value sits on its own line beside that entity's
 * IDENTITY (a deterministic color dot + monogram), so a reader can hold one
 * entity in mind while scanning down the attribute groups. Same cells rendered
 * once — never a wide horizontal scroll, never a `hidden md:*` dual tree.
 *
 * Cell value FORMATS — each format renders a VISUAL CUE, never flat text:
 *   - score    -> a filled METER (proportional to value/scoreMax) + the number.
 *   - percent  -> a horizontal BAR + the %.
 *   - badge    -> a real PILL; categories are visually distinct (strong / tinted
 *                 / outline) so e.g. Outstanding != Good != Requires Improvement.
 *   - check    -> a larger COLORED icon (yes in --accent, no in --muted-foreground).
 *   - count    -> the number with a subtle unit treatment.
 *   - currency -> Intl-formatted.
 *   - text     -> textual with clear weight.
 *
 * ANTI-RANKING: cues show MAGNITUDE / CATEGORY factually, never a verdict. Bars
 * are brand-toned (no green=good / red=bad), badges are categorical (not
 * judgmental), yes/no uses accent/muted (not success/danger). Nothing is
 * auto-highlighted as a "winner" and nothing is sorted by value.
 *
 * Reads tokens ONLY via var(--*). Row-stagger entrance motion gated on
 * prefers-reduced-motion. Safe empty state.
 */
export type CellFormat =
  | "text"
  | "badge"
  | "score"
  | "percent"
  | "check"
  | "count"
  | "currency";

export interface ComparisonEntity {
  /** Stable id (also seeds the deterministic identity hue). */
  id: string;
  /** Column header label. */
  name: string;
  /** Optional sub-label under the name. */
  subtitle?: string;
  /** Attribute values keyed by attribute id. */
  values: Record<string, string | number | boolean | null | undefined>;
}

export interface ComparisonAttribute {
  /** Stable id matching the keys in entity.values. */
  id: string;
  /** Row label. */
  label: string;
  /** How to render this attribute's cells. Default "text". */
  format?: CellFormat;
  /** For "score": the max score (default 5). */
  scoreMax?: number;
  /** For "percent": the value that fills the bar (default 100, i.e. value is a %). */
  percentMax?: number;
  /** For "count": an optional unit suffix shown muted after the number (e.g. "pupils"). */
  unit?: string;
  /** For "currency": the ISO currency code (default USD). */
  currency?: string;
  /** Optional helper text under the row label. */
  hint?: string;
}

export interface ComparisonTableProps {
  entities: ComparisonEntity[];
  attributes: ComparisonAttribute[];
  /** Rendered when there are no entities or no attributes. */
  emptyState?: React.ReactNode;
  /** Accessible caption / label. */
  caption?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
 * Per-entity IDENTITY — a deterministic hue + monogram derived from the entity
 * id (stable across re-renders and across every attribute group). The hue is
 * spun off the brand --primary so it stays on-palette; we only rotate the HUE
 * channel (no new color tokens needed — `color-mix` over var(--primary) keeps
 * the dot brand-toned and token-driven, never a hardcoded color).
 * ------------------------------------------------------------------------- */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function monogram(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** A token-derived hue offset, 0..330 in 30deg steps. We tint the brand color by
 * rotating it through `hue-rotate` inside a color-mix so the dot stays within the
 * design system's palette while still differentiating entities. */
function identityHue(id: string): number {
  return (hashString(id) % 12) * 30;
}

function EntityIdentity({
  entity,
  size = "sm",
}: {
  entity: ComparisonEntity;
  size?: "sm" | "md";
}) {
  const hue = identityHue(entity.id);
  const dim = size === "md" ? "1.5rem" : "1.25rem";
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: dim,
        height: dim,
        fontSize: "0.65rem",
        lineHeight: 1,
        // Tint the brand primary by rotating its hue, then mix toward the card
        // surface so the chip is a soft, on-palette badge (no hardcoded color).
        background: `color-mix(in oklch, ${`hsl(from var(--primary) calc(h + ${hue}) s l)`} 22%, var(--card))`,
        color: `hsl(from var(--primary) calc(h + ${hue}) s calc(l - 18))`,
      }}
    >
      {monogram(entity.name)}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * BADGE category variants — deterministic, categorical (NOT judgmental). We map
 * each distinct category string to one of three NEUTRAL visual treatments
 * (strong / tinted / outline) by stable hash, so the SAME category always looks
 * the same and DIFFERENT categories look different at a glance — without
 * encoding a good/bad verdict (no success/danger coloring).
 * ------------------------------------------------------------------------- */
type BadgeTone = "strong" | "tinted" | "outline";

function badgeTone(value: string): BadgeTone {
  const tones: BadgeTone[] = ["strong", "tinted", "outline"];
  return tones[hashString(value) % tones.length];
}

function CategoryPill({ value }: { value: string }) {
  const tone = badgeTone(value);
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 font-semibold whitespace-nowrap";
  const styleByTone: Record<BadgeTone, React.CSSProperties> = {
    strong: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      borderRadius: "var(--radius-sm)",
    },
    tinted: {
      background: "color-mix(in oklch, var(--primary) 14%, var(--card))",
      color: "var(--foreground)",
      borderRadius: "var(--radius-sm)",
    },
    outline: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
    },
  };
  return (
    <span
      className={base}
      style={{ fontSize: "var(--text-small)", ...styleByTone[tone] }}
    >
      {tone !== "outline" ? null : (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--muted-foreground)" }}
        />
      )}
      {value}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * A horizontal magnitude BAR shared by `score` and `percent`. Brand-toned, NOT
 * verdict-colored. Animates its fill on mount via the motion tokens; the
 * framer `useReducedMotion` flag collapses the animation to a static bar.
 * ------------------------------------------------------------------------- */
function MagnitudeBar({
  fraction,
  reduced,
  width = "4rem",
}: {
  fraction: number;
  reduced: boolean | null;
  width?: string;
}) {
  const pct = Math.max(0, Math.min(1, fraction));
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-2 overflow-hidden rounded-full"
      style={{ width, background: "color-mix(in oklch, var(--muted) 70%, var(--card))" }}
    >
      <motion.span
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ background: "var(--primary)" }}
        initial={reduced ? false : { width: 0 }}
        animate={{ width: `${pct * 100}%` }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.2, 0, 0.38, 0.9] }
        }
      />
    </span>
  );
}

function CellValue({
  value,
  attr,
  reduced,
}: {
  value: ComparisonEntity["values"][string];
  attr: ComparisonAttribute;
  reduced: boolean | null;
}): React.ReactElement {
  const fmt = attr.format ?? "text";
  if (value === null || value === undefined || value === "") {
    return (
      <span className="text-muted-foreground">
        <span aria-hidden="true">—</span>
        <span className="sr-only">No data</span>
      </span>
    );
  }
  switch (fmt) {
    case "check":
      return value ? (
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Check
            className="h-5 w-5"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <span>Yes</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Minus className="h-5 w-5" aria-hidden="true" />
          <span>No</span>
        </span>
      );
    case "badge":
      return <CategoryPill value={String(value)} />;
    case "score": {
      const max = attr.scoreMax ?? 5;
      const num = typeof value === "number" ? value : Number(value);
      const finite = Number.isFinite(num);
      const fraction = finite ? num / max : 0;
      return (
        <span className="inline-flex items-center gap-2">
          <span className="sr-only">{finite ? `${num} out of ${max}` : String(value)}</span>
          <MagnitudeBar fraction={fraction} reduced={reduced} />
          <span className="tabular-nums font-medium text-foreground" aria-hidden="true">
            {finite ? num : String(value)}
            <span className="font-normal text-muted-foreground">/{max}</span>
          </span>
        </span>
      );
    }
    case "percent": {
      const max = attr.percentMax ?? 100;
      const num = typeof value === "number" ? value : Number(value);
      const finite = Number.isFinite(num);
      const fraction = finite ? num / max : 0;
      return (
        <span className="inline-flex items-center gap-2">
          <span className="sr-only">{finite ? `${num} percent` : String(value)}</span>
          <MagnitudeBar fraction={fraction} reduced={reduced} />
          <span className="tabular-nums font-medium text-foreground" aria-hidden="true">
            {finite ? `${num}%` : String(value)}
          </span>
        </span>
      );
    }
    case "count": {
      const num = typeof value === "number" ? value : Number(value);
      const display = Number.isFinite(num) ? num : String(value);
      return (
        <span className="inline-flex items-baseline gap-1">
          <span className="tabular-nums font-medium text-foreground">{display}</span>
          {attr.unit && (
            <span className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
              {attr.unit}
            </span>
          )}
        </span>
      );
    }
    case "currency": {
      const num = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(num)) return <span className="font-medium">{String(value)}</span>;
      let formatted: string;
      try {
        formatted = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: attr.currency ?? "USD",
          maximumFractionDigits: 0,
        }).format(num);
      } catch {
        formatted = String(num);
      }
      return <span className="tabular-nums font-medium text-foreground">{formatted}</span>;
    }
    case "text":
    default:
      return <span className="font-medium text-foreground">{String(value)}</span>;
  }
}

/* ---------------------------------------------------------------------------
 * ONE responsive layout. Desktop = a scannable matrix (entities are columns,
 * attributes are rows). Below ~768px the SAME <table> reflows to per-ATTRIBUTE
 * cards: each row becomes a titled card, each data cell becomes a line carrying
 * the entity's identity (dot + monogram + name) on the left and the value cue on
 * the right. The entity identity markup lives inside every cell but is hidden on
 * desktop (the column header carries identity there) — no duplicate DOM tree.
 * ------------------------------------------------------------------------- */
const MOBILE_CARD_CSS = `
.prumo-ct .prumo-ct-cell-entity { display: none; }
@media (max-width: 47.99em) {
  .prumo-ct thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-ct, .prumo-ct tbody, .prumo-ct tr, .prumo-ct th, .prumo-ct td { display: block; }
  .prumo-ct { border: 0; overflow: visible; }
  .prumo-ct tbody { display: grid; gap: var(--density-gap); }
  /* Each ATTRIBUTE row = a card. */
  .prumo-ct tr {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--density-padding);
    box-shadow: var(--shadow-sm);
    background: var(--card);
  }
  .prumo-ct th[scope="row"] {
    padding: 0 0 0.75rem 0;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid var(--border);
    font-size: var(--text-body);
    font-weight: 700;
    color: var(--foreground);
    font-family: var(--font-display);
  }
  /* Each entity value = a line: identity on the left, value cue on the right. */
  .prumo-ct td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--density-gap);
    padding: 0.6rem 0;
    text-align: right;
  }
  .prumo-ct tr td + td { border-top: 1px solid color-mix(in oklch, var(--border) 60%, transparent); }
  .prumo-ct .prumo-ct-cell-entity {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: var(--foreground);
    text-align: left;
  }
}
`;

export function ComparisonTable({
  entities,
  attributes,
  emptyState,
  caption,
  className,
}: ComparisonTableProps) {
  const prefersReducedMotion = useReducedMotion();

  if (entities.length === 0 || attributes.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-muted-foreground",
          className,
        )}
      >
        {emptyState ?? "Nothing to compare yet."}
      </div>
    );
  }

  return (
    <div className={cn("prumo-ct w-full overflow-hidden rounded-lg border border-border", className)}>
      <style>{MOBILE_CARD_CSS}</style>
      <table className="w-full caption-bottom border-collapse" style={{ fontSize: "var(--text-small)" }}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-muted/40">
          <tr className="border-b border-border">
            <th scope="col" className="h-14 px-4 text-left align-bottom font-medium text-muted-foreground">
              <span className="sr-only">Attribute</span>
            </th>
            {entities.map((e) => (
              <th key={e.id} scope="col" className="h-14 px-4 text-left align-bottom">
                <span className="flex items-center gap-2">
                  <EntityIdentity entity={e} size="md" />
                  <span className="min-w-0">
                    <span
                      className="block truncate font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {e.name}
                    </span>
                    {e.subtitle && (
                      <span className="block truncate text-muted-foreground">{e.subtitle}</span>
                    )}
                  </span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr, i) => (
            <motion.tr
              key={attr.id}
              className="border-b border-border last:border-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, delay: Math.min(i * 0.04, 0.4), ease: [0.2, 0, 0.38, 0.9] }
              }
            >
              <th scope="row" className="px-4 py-4 text-left align-top font-semibold text-foreground">
                {attr.label}
                {attr.hint && (
                  <span className="block font-normal text-muted-foreground">{attr.hint}</span>
                )}
              </th>
              {entities.map((e) => (
                <td key={e.id} className="px-4 py-4 align-middle">
                  {/* Entity identity — shown only in the mobile card reflow. */}
                  <span className="prumo-ct-cell-entity">
                    <EntityIdentity entity={e} />
                    <span className="truncate">{e.name}</span>
                  </span>
                  <CellValue value={e.values[attr.id]} attr={attr} reduced={prefersReducedMotion} />
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

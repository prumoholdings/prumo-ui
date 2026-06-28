import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Info } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * ComparisonTable — the INTELLIGENCE composite (the anti-ranking comparator). It
 * compares N entities across M attributes: entities are COLUMNS, attributes are
 * ROWS — a TRUE MATRIX, never stacked attribute-cards.
 *
 * STRUCTURE (the craft, Phase 64 / approved "Variant A"):
 *   - The attribute-LABEL column is FROZEN (sticky-left) on a tinted surface — the
 *     reading anchor that never scrolls away, so the reader never has to hold a
 *     value in memory.
 *   - The entity HEADER row is STICKY (sticky-top) — identity stays visible while
 *     scanning down.
 *   - ONE responsive layout (no dual tree, no per-attribute cards): a single
 *     <table> in a horizontally-scrollable container. Desktop fits; on a phone the
 *     frozen label column stays put and the entity columns SCROLL horizontally
 *     (~2 visible) with a soft right-edge fade + a "swipe for more" hint.
 *
 * Cell value FORMATS — each renders a VISUAL CUE, never flat text:
 *   - score    -> a filled METER (value/scoreMax) hugging the number.
 *   - percent  -> a horizontal BAR hugging the %.
 *   - badge    -> a neutral PILL + a categorical IDENTITY dot (stable per category).
 *   - check    -> a tinted square + icon (yes in --primary, no in --muted-foreground).
 *   - count    -> the number with a muted unit.
 *   - currency -> Intl-formatted.
 *   - text     -> textual with clear weight.
 *
 * ANTI-RANKING: cues show MAGNITUDE / CATEGORY factually, never a verdict. Bars
 * are brand-toned (no green=good / red=bad); category dots are a STABLE per-value
 * IDENTITY hue (not a quality color), disclaimed in the legend; yes/no uses
 * primary/muted (not success/danger). Nothing is auto-highlighted as a "winner"
 * and nothing is sorted by value.
 *
 * Reads tokens ONLY via var(--*). Row-stagger entrance + bar-fill gated on
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
  /** Optional category-group id (see `groups`). Attributes sharing a group id are
   * rendered under that group's spanning header, in attribute order. */
  group?: string;
}

export interface ComparisonGroup {
  /** Group id referenced by `ComparisonAttribute.group`. */
  id: string;
  /** Group header label. */
  label: string;
  /** Optional one-line description under the group label. */
  description?: string;
}

export type ComparisonDensity = "comfortable" | "compact";

export interface ComparisonTableProps {
  entities: ComparisonEntity[];
  attributes: ComparisonAttribute[];
  /** Optional category groups; attributes carrying a matching `group` render
   * under a spanning group header. Attributes without a group (or with no
   * `groups` supplied) render flat (the default, matches Variant A). */
  groups?: ComparisonGroup[];
  /** Optional editorial header (eyebrow / title / description / sources). */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Provenance line (rendered with an info glyph) — the sourced, compare-not-rank wedge. */
  sources?: string;
  /** Optional footnote under the legend (e.g. the anti-ranking disclaimer). */
  footnote?: string;
  /** Subset of attribute ids considered "key". When provided, a Key/All toggle
   * appears and defaults to the key subset. */
  keyAttributeIds?: string[];
  /** Initial density. Default "comfortable". */
  density?: ComparisonDensity;
  /** Show a Comfortable/Compact density toggle. Default false (clean Variant-A look). */
  enableDensityToggle?: boolean;
  /** Rendered when there are no entities or no attributes. */
  emptyState?: React.ReactNode;
  /** Accessible caption / label. */
  caption?: string;
  className?: string;
}

/* ---------------------------------------------------------------------------
 * Deterministic identity / category hues — spun off the brand --primary so they
 * stay on-palette (we only rotate the HUE channel via relative-color syntax; no
 * new color tokens). Stable across re-renders.
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

function hueFor(id: string): number {
  return (hashString(id) % 12) * 30;
}

/** The entity column-header identity: a rounded-SQUARE monogram chip (Variant A),
 * tinted by a stable per-entity hue spun off --primary. */
function EntityIdentity({
  entity,
  size = "sm",
}: {
  entity: ComparisonEntity;
  size?: "sm" | "md";
}) {
  const hue = hueFor(entity.id);
  const dim = size === "md" ? "1.625rem" : "1.375rem";
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center font-semibold"
      style={{
        width: dim,
        height: dim,
        fontSize: "0.7rem",
        lineHeight: 1,
        borderRadius: "var(--radius-sm)",
        background: `color-mix(in oklch, ${`hsl(from var(--primary) calc(h + ${hue}) s l)`} 20%, var(--card))`,
        color: `hsl(from var(--primary) calc(h + ${hue}) s calc(l - 20))`,
      }}
    >
      {monogram(entity.name)}
    </span>
  );
}

/** A category dot — an evenly-spread, distinct per-category IDENTITY hue (NOT a
 * quality color). The hue offset is assigned by the parent from the set of
 * distinct categories (so they are visually separable, not hash-clustered) and
 * is shared by the in-cell pill and the legend. Disclaimed in the legend as
 * categorical. Rotated off --primary so it stays on-palette. */
function categoryDotStyle(hueOffset: number): React.CSSProperties {
  // Distinct by HUE (evenly spread), MUTED by saturation — calm/earthy register,
  // never a hot/vivid pop that reads as alert or quality (anti-ranking). Hue
  // separation keeps categories distinguishable while staying on the calm palette.
  return {
    background: `hsl(from var(--primary) calc(h + ${hueOffset}) calc(s * 0.5) calc(l * 0.82))`,
  };
}

function CategoryPill({ value, hueOffset }: { value: string; hueOffset: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 font-semibold"
      style={{
        fontSize: "var(--text-small)",
        borderRadius: "var(--radius-sm)",
        background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
        color: "var(--foreground)",
        border: "1px solid color-mix(in oklch, var(--border) 70%, transparent)",
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 shrink-0 rounded-full"
        style={categoryDotStyle(hueOffset)}
      />
      {value}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * A horizontal magnitude BAR shared by `score` and `percent`. Brand-toned, NOT
 * verdict-colored. Animates its fill on mount via framer; `useReducedMotion`
 * collapses it to a static bar. (Width animation is safe under sticky — it does
 * not transform a sticky ancestor.)
 * ------------------------------------------------------------------------- */
function MagnitudeBar({
  fraction,
  reduced,
  width = "4.75rem",
}: {
  fraction: number;
  reduced: boolean | null;
  width?: string;
}) {
  const pct = Math.max(0, Math.min(1, fraction));
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-1.5 overflow-hidden rounded-full"
      style={{ width, background: "color-mix(in oklch, var(--muted) 70%, var(--card))" }}
    >
      <motion.span
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ background: "var(--primary)" }}
        initial={reduced ? false : { width: 0 }}
        animate={{ width: `${pct * 100}%` }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0, 0.38, 0.9] }}
      />
    </span>
  );
}

function CellValue({
  value,
  attr,
  reduced,
  catHue,
}: {
  value: ComparisonEntity["values"][string];
  attr: ComparisonAttribute;
  reduced: boolean | null;
  catHue: Map<string, number>;
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
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center"
            style={{
              borderRadius: "var(--radius-sm)",
              background: "color-mix(in oklch, var(--primary) 16%, var(--card))",
            }}
          >
            <Check className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
          </span>
          <span>Yes</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center"
            style={{
              borderRadius: "var(--radius-sm)",
              background: "color-mix(in oklch, var(--muted) 55%, var(--card))",
            }}
          >
            <Minus className="h-3.5 w-3.5" />
          </span>
          <span>No</span>
        </span>
      );
    case "badge":
      return <CategoryPill value={String(value)} hueOffset={catHue.get(String(value)) ?? 0} />;
    case "score": {
      const max = attr.scoreMax ?? 5;
      const num = typeof value === "number" ? value : Number(value);
      const finite = Number.isFinite(num);
      const fraction = finite ? num / max : 0;
      return (
        <span className="inline-flex items-center gap-2">
          <span className="sr-only">{finite ? `${num} out of ${max}` : String(value)}</span>
          <MagnitudeBar fraction={fraction} reduced={reduced} />
          <span className="tabular-nums font-semibold text-foreground" aria-hidden="true">
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
          <span className="tabular-nums font-semibold text-foreground" aria-hidden="true">
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
          <span className="tabular-nums font-semibold text-foreground">{display}</span>
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
      return <span className="tabular-nums font-semibold text-foreground">{formatted}</span>;
    }
    case "text":
    default:
      return <span className="font-medium text-foreground">{String(value)}</span>;
  }
}

/* ---------------------------------------------------------------------------
 * ONE responsive layout. A single <table> in an overflow-x container.
 *   - The corner cell + every row LABEL is `position: sticky; left: 0` → the
 *     label column stays frozen while entity columns scroll horizontally.
 *   - The header row is `position: sticky; top: 0` → identity stays while scanning.
 *   - Row-stagger entrance animates INNER cell spans only (never the <tr> / cell),
 *     so no transformed ancestor breaks the sticky cells.
 *   - Below ~430px the column widths tighten (~2 visible) and a right-edge fade +
 *     swipe hint appear. No duplicate DOM, no per-attribute cards.
 * ------------------------------------------------------------------------- */
const MATRIX_CSS = `
.prumo-ct { position: relative; --ct-label-w: 10rem; --ct-col-w: 10.25rem; --ct-pad-y: 1.25rem; --ct-pad-x: 1.35rem; }
.prumo-ct[data-density="compact"] { --ct-pad-y: 0.7rem; --ct-pad-x: 1rem; }
.prumo-ct-scroll { position: relative; overflow-x: auto; overflow-y: visible; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--card); box-shadow: var(--shadow-sm); -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
.prumo-ct table { width: 100%; border-collapse: separate; border-spacing: 0; }
.prumo-ct th, .prumo-ct td { text-align: left; vertical-align: middle; padding: var(--ct-pad-y) var(--ct-pad-x); }
/* row separators = hairlines on the body cells */
.prumo-ct tbody td, .prumo-ct tbody th[scope="row"] { border-top: 1px solid color-mix(in oklch, var(--border) 75%, transparent); }
.prumo-ct tbody tr:hover td, .prumo-ct tbody tr:hover th[scope="row"] { background-color: color-mix(in oklch, var(--muted) 28%, var(--card)); }
/* frozen LABEL column — separated by position + a hairline, lightly tinted */
.prumo-ct .prumo-ct-corner, .prumo-ct th[scope="row"] {
  position: sticky; left: 0; z-index: 2;
  min-width: var(--ct-label-w); width: var(--ct-label-w);
  background: color-mix(in oklch, var(--muted) 22%, var(--card));
  border-right: 1px solid var(--border);
}
/* sticky HEADER row */
.prumo-ct thead th { position: sticky; top: 0; z-index: 3; background: color-mix(in oklch, var(--muted) 18%, var(--card)); border-bottom: 1px solid var(--border); vertical-align: bottom; padding-top: 1.35rem; padding-bottom: 1.35rem; }
.prumo-ct .prumo-ct-corner { z-index: 4; top: 0; }
/* entity columns */
.prumo-ct thead th.prumo-ct-entity, .prumo-ct tbody td { min-width: var(--ct-col-w); }
.prumo-ct tbody td { background: var(--card); }
/* group header row */
.prumo-ct .prumo-ct-group th { position: sticky; left: 0; z-index: 2; background: color-mix(in oklch, var(--muted) 40%, var(--card)); border-top: 1px solid var(--border); font-family: var(--font-display); }
/* row-stagger on INNER spans only (sticky-safe) */
.prumo-ct-cell-in { display: inline-flex; }
@media (prefers-reduced-motion: no-preference) {
  .prumo-ct-anim .prumo-ct-cell-in { animation: prumo-ct-in var(--duration-base, 300ms) var(--ease-entrance, cubic-bezier(0.2,0,0.38,0.9)) both; }
}
@keyframes prumo-ct-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
/* right-edge fade + swipe hint — only when the columns scroll (small screens) */
.prumo-ct-fade { display: none; }
.prumo-ct-swipe { display: none; }
@media (max-width: 30em) {
  .prumo-ct { --ct-label-w: 7.5rem; --ct-col-w: 8.25rem; --ct-pad-x: 0.8rem; }
  .prumo-ct-fade { display: block; position: absolute; top: 0; bottom: 0; right: 0; width: 2.25rem; pointer-events: none; z-index: 3; border-top-right-radius: var(--radius-lg); border-bottom-right-radius: var(--radius-lg); background: linear-gradient(to right, transparent, var(--card)); }
  .prumo-ct-swipe { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding-top: 0.7rem; color: var(--muted-foreground); font-size: var(--text-small); }
}
`;

export function ComparisonTable({
  entities,
  attributes,
  groups,
  eyebrow,
  title,
  description,
  sources,
  footnote,
  keyAttributeIds,
  density = "comfortable",
  enableDensityToggle = false,
  emptyState,
  caption,
  className,
}: ComparisonTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const [dens, setDens] = React.useState<ComparisonDensity>(density);
  const hasKeySubset = !!keyAttributeIds && keyAttributeIds.length > 0;
  const [showKeyOnly, setShowKeyOnly] = React.useState<boolean>(hasKeySubset);

  if (entities.length === 0 || attributes.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center text-muted-foreground",
          className,
        )}
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        {emptyState ?? "Nothing to compare yet."}
      </div>
    );
  }

  const visibleAttributes =
    hasKeySubset && showKeyOnly
      ? attributes.filter((a) => keyAttributeIds!.includes(a.id))
      : attributes;

  // Order attributes by group (if groups supplied), preserving attribute order
  // within each group; ungrouped attributes keep their position via a synthetic
  // "" group so the flat default is untouched.
  const groupOrder = groups && groups.length > 0 ? groups.map((g) => g.id) : [];
  const rows: Array<
    | { kind: "group"; group: ComparisonGroup }
    | { kind: "attr"; attr: ComparisonAttribute }
  > = [];
  if (groupOrder.length > 0) {
    for (const g of groups!) {
      const inGroup = visibleAttributes.filter((a) => a.group === g.id);
      if (inGroup.length === 0) continue;
      rows.push({ kind: "group", group: g });
      for (const a of inGroup) rows.push({ kind: "attr", attr: a });
    }
    // any attributes without a recognised group, appended flat
    for (const a of visibleAttributes) {
      if (!a.group || !groupOrder.includes(a.group)) rows.push({ kind: "attr", attr: a });
    }
  } else {
    for (const a of visibleAttributes) rows.push({ kind: "attr", attr: a });
  }

  // Legend: distinct categories across badge attributes + a check legend if used.
  const badgeCategories = Array.from(
    new Set(
      attributes
        .filter((a) => (a.format ?? "text") === "badge")
        .flatMap((a) => entities.map((e) => e.values[a.id]))
        .filter((v): v is string => typeof v === "string" && v.length > 0),
    ),
  );
  const hasCheck = attributes.some((a) => (a.format ?? "text") === "check");

  // Evenly-spread, distinct identity hue per category (not hash-clustered), shared
  // by the in-cell pills and the legend so the categories are visually separable.
  const catHue = new Map<string, number>(
    badgeCategories.map((c, i) => [c, Math.round((i * 300) / Math.max(badgeCategories.length, 1))]),
  );

  const showControls = enableDensityToggle || hasKeySubset;
  let attrRowIndex = 0; // for stagger delay (attribute rows only)

  return (
    <div className={cn("prumo-ct w-full", className)} data-density={dens}>
      <style>{MATRIX_CSS}</style>

      {(eyebrow || title || description || sources) && (
        <header className="mb-5">
          {eyebrow && (
            <p
              className="mb-2 font-semibold uppercase"
              style={{ fontSize: "var(--text-small)", letterSpacing: "0.08em", color: "var(--primary)" }}
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className="text-balance font-semibold text-foreground"
              style={{ fontSize: "var(--text-h2)", fontFamily: "var(--font-display)", lineHeight: 1.1 }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 max-w-prose text-muted-foreground" style={{ fontSize: "var(--text-body)" }}>
              {description}
            </p>
          )}
          {sources && (
            <p
              className="mt-3 inline-flex items-center gap-1.5 text-muted-foreground"
              style={{ fontSize: "var(--text-small)" }}
            >
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {sources}
            </p>
          )}
        </header>
      )}

      {showControls && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {hasKeySubset && (
            <Segmented
              ariaLabel="Show key attributes or all attributes"
              options={[
                { id: "key", label: "Key" },
                { id: "all", label: "All" },
              ]}
              value={showKeyOnly ? "key" : "all"}
              onChange={(v) => setShowKeyOnly(v === "key")}
            />
          )}
          {enableDensityToggle && (
            <Segmented
              ariaLabel="Row density"
              options={[
                { id: "comfortable", label: "Comfortable" },
                { id: "compact", label: "Compact" },
              ]}
              value={dens}
              onChange={(v) => setDens(v as ComparisonDensity)}
            />
          )}
        </div>
      )}

      <div className="prumo-ct-scroll">
        <table
          className={cn(!prefersReducedMotion && "prumo-ct-anim")}
          style={{ fontSize: "var(--text-small)" }}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr>
              <th scope="col" className="prumo-ct-corner align-bottom">
                <span className="prumo-ct-cell-in font-medium uppercase text-muted-foreground" style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}>
                  {/* deliberately quiet corner label */}
                  Compare
                </span>
              </th>
              {entities.map((e) => (
                <th key={e.id} scope="col" className="prumo-ct-entity align-bottom">
                  <span className="prumo-ct-cell-in items-start gap-2.5">
                    <EntityIdentity entity={e} size="md" />
                    <span className="min-w-0">
                      <span
                        className="block font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body)", lineHeight: 1.15 }}
                      >
                        {e.name}
                      </span>
                      {e.subtitle && (
                        <span className="block truncate font-normal text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                          {e.subtitle}
                        </span>
                      )}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              if (row.kind === "group") {
                return (
                  <tr key={`g-${row.group.id}`} className="prumo-ct-group">
                    <th scope="colgroup" colSpan={entities.length + 1}>
                      <span className="prumo-ct-cell-in flex-col items-start gap-0.5">
                        <span className="font-semibold text-foreground" style={{ fontSize: "var(--text-small)" }}>
                          {row.group.label}
                        </span>
                        {row.group.description && (
                          <span className="font-normal text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                            {row.group.description}
                          </span>
                        )}
                      </span>
                    </th>
                  </tr>
                );
              }
              const attr = row.attr;
              const delay = prefersReducedMotion ? 0 : Math.min(attrRowIndex * 0.04, 0.4);
              attrRowIndex += 1;
              const inStyle: React.CSSProperties = { animationDelay: `${delay}s` };
              return (
                <tr key={attr.id}>
                  <th scope="row" className="align-top">
                    <span className="prumo-ct-cell-in flex-col items-start gap-0.5" style={inStyle}>
                      <span className="font-semibold text-foreground">{attr.label}</span>
                      {attr.hint && (
                        <span className="font-normal text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                          {attr.hint}
                        </span>
                      )}
                    </span>
                  </th>
                  {entities.map((e) => (
                    <td key={e.id}>
                      <span className="prumo-ct-cell-in" style={inStyle}>
                        <CellValue value={e.values[attr.id]} attr={attr} reduced={prefersReducedMotion} catHue={catHue} />
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="prumo-ct-fade" aria-hidden="true" />
      </div>

      <p className="prumo-ct-swipe" aria-hidden="true">
        ← swipe to compare {entities.length} →
      </p>

      {(badgeCategories.length > 0 || hasCheck || footnote) && (
        <div className="mt-4">
          {(badgeCategories.length > 0 || hasCheck) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
              {badgeCategories.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full" style={categoryDotStyle(catHue.get(c) ?? 0)} aria-hidden="true" />
                  {c}
                </span>
              ))}
              {hasCheck && (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} aria-hidden="true" />
                  Available
                </span>
              )}
            </div>
          )}
          {footnote && (
            <p className="mt-2 max-w-prose text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
              {footnote}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* A small, accessible segmented control (real buttons + aria-pressed). Token-only. */
function Segmented({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: Array<{ id: string; label: string }>;
  value: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-0.5 p-0.5"
      style={{
        borderRadius: "var(--radius)",
        background: "color-mix(in oklch, var(--muted) 55%, var(--card))",
        border: "1px solid var(--border)",
      }}
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className="px-3 py-1 font-medium transition-colors"
            style={{
              minHeight: "2rem",
              fontSize: "var(--text-small)",
              borderRadius: "calc(var(--radius) - 0.15rem)",
              background: active ? "var(--card)" : "transparent",
              color: active ? "var(--foreground)" : "var(--muted-foreground)",
              boxShadow: active ? "var(--shadow-sm)" : "none",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

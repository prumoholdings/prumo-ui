import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

/**
 * ComparisonTable — the INTELLIGENCE composite (the anti-ranking comparator). It
 * compares N entities across M attributes: entities are COLUMNS, attributes are
 * ROWS on desktop.
 *
 * ONE RESPONSIVE LAYOUT (no duplicate trees): a single matrix that REFLOWS via
 * CSS to per-ENTITY stacked cards on small screens (each entity becomes a card
 * listing its attribute/value pairs) — the same cells rendered once, never a
 * wide horizontal scroll.
 *
 * Cell value FORMATS: text | badge | score | check | currency — declared per
 * attribute, so the matrix is archetype-generic (works for schools, SaaS tools,
 * cars, anything). Reads tokens ONLY via var(--*). Row-stagger entrance motion
 * gated on prefers-reduced-motion. Safe empty state.
 */
export type CellFormat = "text" | "badge" | "score" | "check" | "currency";

export interface ComparisonEntity {
  /** Stable id. */
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

const MOBILE_CARD_CSS = `
@media (max-width: 47.99em) {
  .prumo-ct thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-ct, .prumo-ct tbody, .prumo-ct tr, .prumo-ct th, .prumo-ct td { display: block; }
  .prumo-ct { border: 0; }
  /* Each ATTRIBUTE row becomes a labelled block inside a per-entity card column.
     We pivot by stacking: every data cell shows its entity name via data-entity. */
  .prumo-ct tr { border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: var(--density-gap); padding: var(--density-padding); box-shadow: var(--shadow-sm); background: var(--card); }
  .prumo-ct th[scope="row"] { font-weight: 600; color: var(--foreground); padding: 0 0 0.5rem 0; }
  .prumo-ct td { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; text-align: right; }
  .prumo-ct td::before { content: attr(data-entity); font-weight: 600; color: var(--muted-foreground); text-align: left; }
}
`;

function formatValue(
  value: ComparisonEntity["values"][string],
  attr: ComparisonAttribute,
): React.ReactNode {
  const fmt = attr.format ?? "text";
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground">—</span>;
  }
  switch (fmt) {
    case "check":
      return value ? (
        <span className="inline-flex items-center gap-1 text-foreground">
          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="sr-only">Yes</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Minus className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">No</span>
        </span>
      );
    case "badge":
      return <Badge variant="secondary">{String(value)}</Badge>;
    case "score": {
      const max = attr.scoreMax ?? 5;
      const num = typeof value === "number" ? value : Number(value);
      const pct = Number.isFinite(num) ? Math.max(0, Math.min(1, num / max)) : 0;
      return (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="relative inline-block h-2 w-16 overflow-hidden rounded-full bg-secondary"
          >
            <span
              className="absolute left-0 top-0 h-full bg-primary"
              style={{ width: `${pct * 100}%`, transition: "width var(--duration-base) var(--ease-standard)" }}
            />
          </span>
          <span className="tabular-nums">
            {Number.isFinite(num) ? num : String(value)}
            <span className="text-muted-foreground">/{max}</span>
          </span>
        </span>
      );
    }
    case "currency": {
      const num = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(num)) return <span>{String(value)}</span>;
      try {
        return (
          <span className="tabular-nums">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: attr.currency ?? "USD",
              maximumFractionDigits: 0,
            }).format(num)}
          </span>
        );
      } catch {
        return <span className="tabular-nums">{num}</span>;
      }
    }
    case "text":
    default:
      return <span>{String(value)}</span>;
  }
}

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
            <th scope="col" className="h-12 px-4 text-left align-bottom font-medium text-muted-foreground">
              <span className="sr-only">Attribute</span>
            </th>
            {entities.map((e) => (
              <th key={e.id} scope="col" className="h-12 px-4 text-left align-bottom">
                <span className="block font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  {e.name}
                </span>
                {e.subtitle && <span className="block text-muted-foreground">{e.subtitle}</span>}
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
              <th scope="row" className="px-4 py-3 text-left align-top font-medium text-foreground">
                {attr.label}
                {attr.hint && (
                  <span className="block font-normal text-muted-foreground">{attr.hint}</span>
                )}
              </th>
              {entities.map((e) => (
                <td key={e.id} className="px-4 py-3 align-top" data-entity={e.name}>
                  {formatValue(e.values[attr.id], attr)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

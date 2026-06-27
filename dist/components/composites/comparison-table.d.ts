import * as React from "react";
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
export type CellFormat = "text" | "badge" | "score" | "percent" | "check" | "count" | "currency";
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
export declare function ComparisonTable({ entities, attributes, emptyState, caption, className, }: ComparisonTableProps): React.JSX.Element;

import * as React from "react";
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
export declare function ComparisonTable({ entities, attributes, emptyState, caption, className, }: ComparisonTableProps): React.JSX.Element;

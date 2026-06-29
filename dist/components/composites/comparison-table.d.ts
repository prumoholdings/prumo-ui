import * as React from "react";
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
export declare function ComparisonTable({ entities, attributes, groups, eyebrow, title, description, sources, footnote, keyAttributeIds, density, enableDensityToggle, emptyState, caption, className, }: ComparisonTableProps): React.JSX.Element;

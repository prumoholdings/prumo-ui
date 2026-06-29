import { CardSpec } from './field-specs';
import * as React from "react";
/**
 * CardCollection — the ENGAGEMENT composite (feed / listing / search-results /
 * gallery / catalog). Renders a generic list of items through a caller-supplied
 * `renderItem` template, in one of three LAYOUTS:
 *
 *   - "grid"    responsive auto-fit grid (1 col -> N cols as width allows)
 *   - "list"    single stacked column
 *   - "masonry" CSS columns (variable-height cards, no JS layout)
 *
 * ONE RESPONSIVE LAYOUT each, all pure CSS reflow (no duplicate trees).
 *
 * MOTION (purposeful, C8): a SUBTLE item-stagger entrance — this is the
 * ENGAGEMENT archetype, where a gentle reveal is purposeful (it choreographs the
 * browse, drawing the eye through the collection), unlike a utilitarian data grid.
 * Kept subtle (small offset, capped delay), gated on prefers-reduced-motion.
 * Safe empty state. Archetype-generic: any item shape, any card template. Reads
 * tokens ONLY via var(--*) (gap via --density-gap, min card width via tokens).
 */
export type CardCollectionLayout = "grid" | "list" | "masonry";
export interface CardCollectionProps<TItem> {
    items: TItem[];
    /** The card template for one item (a render prop). Takes precedence over `card`. */
    renderItem?: (item: TItem, index: number) => React.ReactNode;
    /**
     * A declarative card the component renders per item (Phase 65 data alternative to
     * `renderItem`, so a pure-data ScreenPlan can drive the collection). Used only when
     * `renderItem` is absent. Items are treated as plain records for field lookup.
     */
    card?: CardSpec;
    /** Stable key extractor; defaults to the array index. */
    getKey?: (item: TItem, index: number) => React.Key;
    /** Layout mode. Default "grid". */
    layout?: CardCollectionLayout;
    /** Min card width for the grid layout (CSS length). Default 16rem. */
    minCardWidth?: string;
    /** Rendered when there are zero items. */
    emptyState?: React.ReactNode;
    /** Accessible label for the list region. */
    "aria-label"?: string;
    className?: string;
}
export declare function CardCollection<TItem>({ items, renderItem, card, getKey, layout, minCardWidth, emptyState, "aria-label": ariaLabel, className, }: CardCollectionProps<TItem>): React.JSX.Element;

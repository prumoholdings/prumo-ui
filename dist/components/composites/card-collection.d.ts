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
 * ONE RESPONSIVE LAYOUT each, all pure CSS reflow (no duplicate trees). Item
 * stagger entrance motion via framer-motion, gated on prefers-reduced-motion. A
 * safe empty state. Archetype-generic: any item shape, any card template. Reads
 * tokens ONLY via var(--*) (gap via --density-gap, min card width via tokens).
 */
export type CardCollectionLayout = "grid" | "list" | "masonry";
export interface CardCollectionProps<TItem> {
    items: TItem[];
    /** The card template for one item (a render prop). */
    renderItem: (item: TItem, index: number) => React.ReactNode;
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
export declare function CardCollection<TItem>({ items, renderItem, getKey, layout, minCardWidth, emptyState, "aria-label": ariaLabel, className, }: CardCollectionProps<TItem>): React.JSX.Element;

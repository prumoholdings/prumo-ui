import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

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

export function CardCollection<TItem>({
  items,
  renderItem,
  getKey,
  layout = "grid",
  minCardWidth = "16rem",
  emptyState,
  "aria-label": ariaLabel,
  className,
}: CardCollectionProps<TItem>) {
  const prefersReducedMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          className,
        )}
      >
        {emptyState ?? "Nothing here yet."}
      </div>
    );
  }

  const containerStyle: React.CSSProperties =
    layout === "grid"
      ? {
          display: "grid",
          gap: "var(--density-gap)",
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${minCardWidth}, 100%), 1fr))`,
        }
      : layout === "list"
        ? { display: "flex", flexDirection: "column", gap: "var(--density-gap)" }
        : {
            // masonry via CSS multi-columns: reflows column count by width.
            columnWidth: minCardWidth,
            columnGap: "var(--density-gap)",
          };

  const isMasonry = layout === "masonry";

  return (
    <ul
      role="list"
      aria-label={ariaLabel}
      className={cn("m-0 list-none p-0", className)}
      style={containerStyle}
    >
      {items.map((item, i) => {
        const key = getKey ? getKey(item, i) : i;
        return (
          <motion.li
            key={key}
            role="listitem"
            className={isMasonry ? "mb-[var(--density-gap)] break-inside-avoid" : undefined}
            style={isMasonry ? { breakInside: "avoid" } : undefined}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.3, delay: Math.min(i * 0.04, 0.4), ease: [0, 0, 0.38, 0.9] }
            }
          >
            {renderItem(item, i)}
          </motion.li>
        );
      })}
    </ul>
  );
}

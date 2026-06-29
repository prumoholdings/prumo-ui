import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { DURATION, EASE } from "../../lib/motion";
import { type CardSpec, renderCardSpec } from "./field-specs";

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

export function CardCollection<TItem>({
  items,
  renderItem,
  card,
  getKey,
  layout = "grid",
  minCardWidth = "16rem",
  emptyState,
  "aria-label": ariaLabel,
  className,
}: CardCollectionProps<TItem>) {
  const prefersReducedMotion = useReducedMotion();
  const renderOne = (item: TItem, i: number): React.ReactNode =>
    renderItem
      ? renderItem(item, i)
      : card
        ? renderCardSpec(card, item as Record<string, unknown>)
        : null;

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
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: DURATION.base, delay: Math.min(i * 0.035, 0.32), ease: EASE.entrance }
            }
          >
            {renderOne(item, i)}
          </motion.li>
        );
      })}
    </ul>
  );
}

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

/**
 * Board — the ACTION composite (kanban / pipeline / workflow). Renders generic
 * COLUMNS each holding generic CARDS through a caller-supplied `renderCard`.
 *
 * ONE RESPONSIVE LAYOUT: a single horizontal row of equal-width columns on
 * desktop that REFLOWS to a vertical stack on small screens (flex-col -> flex-row
 * via a media-query-free Tailwind reflow). The SAME DOM, never a duplicate tree.
 *
 * a11y-first card movement: each card carries optional "move to previous/next
 * column" buttons (keyboard-operable, ≥44px) — drag-and-drop is an enhancement,
 * not the only path. Card-stagger entrance motion gated on prefers-reduced-motion.
 * Safe empty columns + empty board. Archetype-generic. Tokens via var(--*) only.
 */
export interface BoardCard {
  id: string;
}

export interface BoardColumn<TCard extends BoardCard> {
  id: string;
  title: string;
  /** Optional accent token name for the column header dot (e.g. "primary"). */
  accentToken?: string;
  cards: TCard[];
}

export interface BoardProps<TCard extends BoardCard> {
  columns: BoardColumn<TCard>[];
  /** The card template. */
  renderCard: (card: TCard, column: BoardColumn<TCard>) => React.ReactNode;
  /** Called when a card's move button is pressed; gives the target column id. */
  onMoveCard?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  /** Per-column empty text. */
  emptyColumnText?: string;
  /** Whole-board empty state (no columns at all). */
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Board<TCard extends BoardCard>({
  columns,
  renderCard,
  onMoveCard,
  emptyColumnText = "No items",
  emptyState,
  className,
  "aria-label": ariaLabel,
}: BoardProps<TCard>) {
  const prefersReducedMotion = useReducedMotion();

  if (columns.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          className,
        )}
      >
        {emptyState ?? "No columns yet."}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel ?? "Board"}
      className={cn(
        // vertical stack on mobile -> horizontal sc*non-wrapping* row on >=md.
        "flex flex-col gap-[var(--density-gap)] md:flex-row md:items-start md:overflow-x-auto",
        className,
      )}
    >
      {columns.map((col, colIdx) => {
        const prev = columns[colIdx - 1];
        const next = columns[colIdx + 1];
        return (
          <section
            key={col.id}
            aria-label={col.title}
            className="flex w-full shrink-0 flex-col rounded-lg border border-border bg-muted/40 p-3 md:w-72"
          >
            <header className="mb-2 flex items-center justify-between gap-2 px-1">
              <h3 className="flex items-center gap-2 font-medium text-foreground" style={{ fontSize: "var(--text-body)" }}>
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: `var(--${col.accentToken ?? "primary"})` }}
                />
                {col.title}
              </h3>
              <Badge variant="secondary">{col.cards.length}</Badge>
            </header>

            <ul role="list" className="flex flex-col gap-[var(--density-gap)] p-0 m-0 list-none">
              {col.cards.length === 0 ? (
                <li className="rounded-md border border-dashed border-border p-4 text-center text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                  {emptyColumnText}
                </li>
              ) : (
                col.cards.map((card, i) => (
                  <motion.li
                    key={card.id}
                    role="listitem"
                    className="rounded-md border border-border bg-card p-3"
                    style={{ boxShadow: "var(--shadow-sm)" }}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.3, delay: Math.min(i * 0.03, 0.25), ease: [0, 0, 0.38, 0.9] }
                    }
                  >
                    {renderCard(card, col)}
                    {onMoveCard && (prev || next) && (
                      <div className="mt-2 flex justify-end gap-1">
                        {prev && (
                          <button
                            type="button"
                            onClick={() => onMoveCard(card.id, col.id, prev.id)}
                            aria-label={`Move to ${prev.title}`}
                            className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            style={{ fontSize: "var(--text-small)" }}
                          >
                            ←
                          </button>
                        )}
                        {next && (
                          <button
                            type="button"
                            onClick={() => onMoveCard(card.id, col.id, next.id)}
                            aria-label={`Move to ${next.title}`}
                            className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            style={{ fontSize: "var(--text-small)" }}
                          >
                            →
                          </button>
                        )}
                      </div>
                    )}
                  </motion.li>
                ))
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

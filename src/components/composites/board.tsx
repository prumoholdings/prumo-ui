import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import { DURATION, EASE } from "../../lib/motion";
import { type CardSpec, renderCardSpec } from "./field-specs";

/**
 * Board — the ACTION composite (kanban / pipeline / workflow). Renders generic
 * COLUMNS each holding generic CARDS through a caller `renderCard`.
 *
 * Tuned to the shipped board bar (Linear): FLAT columns (no heavy column fill) on
 * the canvas with generous gaps; a quiet header (accent dot + title + a MUTED
 * inline count + an optional ＋ affordance); clean white cards with a soft border
 * + subtle elevation.
 *
 * ONE RESPONSIVE LAYOUT: a single horizontal row of columns on desktop that
 * REFLOWS to a vertical stack on small screens (Tailwind flex reflow, no media
 * query, no duplicate DOM).
 *
 * a11y-first card movement: each card carries optional "move to previous/next
 * column" buttons (keyboard-operable, ≥44px) — drag is an enhancement, not the
 * only path. MOTION (C8): a SUBTLE card-stagger reveal on FIRST MOUNT only (never
 * replayed when a card moves / the board re-renders), token-driven, reduced-motion
 * gated. Safe empty columns + board. Archetype-generic. Tokens via var(--*) only.
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
  /** The card template. Takes precedence over `cardSpec`. */
  renderCard?: (card: TCard, column: BoardColumn<TCard>) => React.ReactNode;
  /** A declarative card (Phase 65 data alternative to `renderCard`, so a pure-data
   * ScreenPlan can drive the board). Used only when `renderCard` is absent. */
  cardSpec?: CardSpec;
  /** Called when a card's move button is pressed; gives the target column id. */
  onMoveCard?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  /** When provided, a ＋ affordance appears in each column header. */
  onAddCard?: (columnId: string) => void;
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
  cardSpec,
  onMoveCard,
  onAddCard,
  emptyColumnText = "No items",
  emptyState,
  className,
  "aria-label": ariaLabel,
}: BoardProps<TCard>) {
  const prefersReducedMotion = useReducedMotion();
  const renderOneCard = (card: TCard, col: BoardColumn<TCard>): React.ReactNode =>
    renderCard
      ? renderCard(card, col)
      : cardSpec
        ? renderCardSpec(cardSpec, card as Record<string, unknown>)
        : null;
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);
  const playEntrance = !prefersReducedMotion && firstRenderRef.current;

  // C7: a right-edge fade signals "more columns →" when the row scrolls (desktop).
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showRightFade, setShowRightFade] = React.useState(false);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [columns]);

  if (columns.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          className,
        )}
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        {emptyState ?? "No columns yet."}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        role="group"
        aria-label={ariaLabel ?? "Board"}
        // vertical stack on mobile -> horizontal non-wrapping row on >=md.
        className="flex flex-col gap-5 md:flex-row md:items-start md:gap-5 md:overflow-x-auto md:pb-2"
      >
      {columns.map((col, colIdx) => {
        const prev = columns[colIdx - 1];
        const next = columns[colIdx + 1];
        return (
          <section key={col.id} aria-label={col.title} className="flex w-full shrink-0 flex-col md:w-80">
            <header className="mb-3 flex items-center gap-2 px-0.5">
              {col.accentToken && (
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: `var(--${col.accentToken})` }}
                />
              )}
              <h3 className="font-semibold text-foreground" style={{ fontSize: "var(--text-body)", fontFamily: "var(--font-display)" }}>
                {col.title}
              </h3>
              <span className="tabular-nums text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                {col.cards.length}
              </span>
              <span className="flex-1" />
              {onAddCard && (
                <button
                  type="button"
                  onClick={() => onAddCard(col.id)}
                  aria-label={`Add to ${col.title}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </header>

            <ul role="list" className="m-0 flex list-none flex-col gap-3 p-0">
              {col.cards.length === 0 ? (
                <li
                  className="rounded-lg border border-dashed border-border p-4 text-center text-muted-foreground"
                  style={{ fontSize: "var(--text-small)", borderRadius: "var(--radius-lg)" }}
                >
                  {emptyColumnText}
                </li>
              ) : (
                col.cards.map((card, i) => (
                  <motion.li
                    key={card.id}
                    role="listitem"
                    className="border border-border bg-card p-3.5"
                    style={{ borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}
                    initial={playEntrance ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      playEntrance
                        ? { duration: DURATION.base, delay: Math.min(i * 0.03, 0.25), ease: EASE.entrance }
                        : { duration: 0 }
                    }
                  >
                    {renderOneCard(card, col)}
                    {onMoveCard && (prev || next) && (
                      <div className="mt-2.5 flex justify-end gap-1">
                        {prev && (
                          <button
                            type="button"
                            onClick={() => onMoveCard(card.id, col.id, prev.id)}
                            aria-label={`Move to ${prev.title}`}
                            className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
                            className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-sm px-2 text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
      {showRightFade && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 md:block"
          style={{ background: "linear-gradient(to right, transparent, var(--background))" }}
        />
      )}
    </div>
  );
}

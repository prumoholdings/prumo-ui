import * as React from "react";
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
export declare function Board<TCard extends BoardCard>({ columns, renderCard, onMoveCard, emptyColumnText, emptyState, className, "aria-label": ariaLabel, }: BoardProps<TCard>): React.JSX.Element;

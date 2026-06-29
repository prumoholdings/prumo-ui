import { CardSpec } from './field-specs';
import * as React from "react";
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
export declare function Board<TCard extends BoardCard>({ columns, renderCard, cardSpec, onMoveCard, onAddCard, emptyColumnText, emptyState, className, "aria-label": ariaLabel, }: BoardProps<TCard>): React.JSX.Element;

import { ColumnDef } from '@tanstack/react-table';
import * as React from "react";
/**
 * Declarative FIELD-SPECS (Phase 65 — render-compose-only-emit).
 *
 * The screen-author emits a pure-DATA ScreenPlan; a deterministic harness turns it
 * into `<Component {...props} />`. For that to work, the function/node-prop composites
 * need a DATA alternative to their render functions. These specs + helpers are that
 * alternative: every input is JSON-serializable (string/number/bool/array — NO
 * functions, NO JSX), and the helpers render them through the elevated primitives.
 *
 * ADDITIVE + backward-compatible: a composite that has BOTH a function/node prop and
 * its data spec lets the function/node WIN (consumer override). Tokens via var(--*).
 */
export type ActionVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";
/** A declarative button (renders a Button; render-only — no onClick in a data spec). */
export interface ActionSpec {
    label: string;
    variant?: ActionVariant;
    /** A lucide icon NAME (e.g. "ArrowRight"); resolved internally. */
    icon?: string;
    /** An optional link target (the spec carries no event handlers). */
    href?: string;
}
export type BadgeTone = "neutral" | "accent" | "muted";
export interface CardFieldSpec {
    label: string;
    /** The item key whose value is shown. */
    key: string;
}
export interface CardBadgeSpec {
    /** The item key whose value becomes the badge text. */
    key: string;
    tone?: BadgeTone;
}
/** A declarative card the component renders per item (alternative to renderItem). */
export interface CardSpec {
    /** A literal title; OR set `titleKey` to pull the title from the item. */
    title?: string;
    titleKey?: string;
    subtitleKey?: string;
    /** An item key holding an image URL. */
    mediaKey?: string;
    fields?: CardFieldSpec[];
    badges?: CardBadgeSpec[];
    actions?: ActionSpec[];
}
export type ColumnFormat = "text" | "number" | "currency" | "percent" | "badge" | "date";
/** A declarative table column (alternative to a TanStack ColumnDef with a cell fn). */
export interface ColumnSpec {
    /** Accessor key on the row. */
    key: string;
    header: string;
    align?: "left" | "right" | "center";
    format?: ColumnFormat;
    /** ISO currency code for format="currency" (default USD). */
    currency?: string;
}
/** A declarative filter control (render-only; no callbacks in a data spec). */
export interface FilterSpec {
    id: string;
    kind: "search" | "select";
    label: string;
    /** For kind="select". */
    options?: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
}
export interface AsideFactSpec {
    label: string;
    value: string;
}
/** A declarative summary/actions aside card (alternative to a node `aside`). */
export interface AsideSpec {
    title?: string;
    facts?: AsideFactSpec[];
    actions?: ActionSpec[];
}
type Item = Record<string, unknown>;
/** Resolve a lucide icon NAME → a small icon node (graceful: unknown → null). */
export declare function resolveIcon(name?: string): React.ReactNode;
/** Render a list of ActionSpecs as Buttons (primary on the RIGHT — the dominant pattern). */
export declare function renderActionSpecs(actions?: ActionSpec[]): React.ReactNode;
/** Render a declarative card for one item (CardCollection.card / Board.cardSpec). */
export declare function renderCardSpec(spec: CardSpec, item: Item): React.ReactNode;
/** Build TanStack column defs from declarative ColumnSpecs (DataTable.columnsSpec). */
export declare function buildColumnsFromSpec<TRow extends Item>(specs: ColumnSpec[]): ColumnDef<TRow, unknown>[];
/** Render declarative filter controls (FilterBar.filterSpecs — render-only visuals). */
export declare function renderFilterSpecs(specs?: FilterSpec[]): React.ReactNode;
/** Render a declarative summary/actions aside card (DetailView.asideSpec). */
export declare function renderAsideSpec(spec?: AsideSpec): React.ReactNode;
export {};

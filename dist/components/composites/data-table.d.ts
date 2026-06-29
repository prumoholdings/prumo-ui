import { ColumnDef, RowData } from '@tanstack/react-table';
import { ColumnSpec } from './field-specs';
import * as React from "react";
/**
 * DataTable — the RECORD/INTELLIGENCE composite. A generic, token-skinned data
 * GRID over @tanstack/react-table: column defs, sorting, global filtering,
 * pagination. Tuned to the shipped data-grid bar (Linear / Stripe / Airtable):
 * EFFICIENT density (scan many rows), hairline dividers (no zebra), a STICKY
 * header, numeric columns right-aligned (via `column.meta.align`), a clean
 * toolbar (search + result count + an actions slot), and a refined footer.
 *
 * ONE RESPONSIVE LAYOUT (no duplicate trees): a single semantic `<table>` that is
 * a real grid on >=md and REFLOWS to per-RECORD cards on small screens via CSS —
 * the first column becomes the card title, the rest become labelled rows. (A
 * record list legitimately stacks per row; this is NOT the comparison-matrix
 * card-restack the rubric forbids.) Same DOM, data rendered once.
 *
 * MOTION (purposeful, C8): a data grid is a utilitarian, high-frequency surface,
 * so it has NO entrance choreography (rows would re-stagger on every
 * page/filter/sort — distracting, and Linear/Stripe grids appear instantly).
 * Motion is reserved for FEEDBACK: hover tint + the sort-control color transition,
 * token-driven and reduced-motion-safe (CSS only). Safe empty state.
 * Archetype-generic. Reads tokens ONLY via var(--*).
 */
declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: "left" | "right" | "center";
    }
}
export interface DataTableProps<TData, TValue> {
    /** TanStack column definitions (header/accessor/cell — fully generic). Set
     * `meta: { align: "right" }` on numeric/currency columns. Takes precedence over
     * `columnsSpec`. */
    columns?: ColumnDef<TData, TValue>[];
    /**
     * Declarative columns (Phase 65 data alternative to `columns`, so a pure-data
     * ScreenPlan can drive the table). The component builds the TanStack column defs +
     * format-aware cells from these. Used only when `columns` is absent.
     */
    columnsSpec?: ColumnSpec[];
    /** The row data (any shape). */
    data: TData[];
    /** Show the global search box. Default true. */
    enableFiltering?: boolean;
    /** Show pagination controls. Default true. */
    enablePagination?: boolean;
    /** Rows per page when pagination is on. Default 10. */
    pageSize?: number;
    /** Placeholder for the global filter input. */
    filterPlaceholder?: string;
    /** Optional actions rendered at the right of the toolbar (e.g. Export). */
    toolbarActions?: React.ReactNode;
    /** Enable row selection — a leading checkbox column + a bulk-action bar. */
    enableRowSelection?: boolean;
    /** Rendered in the bulk-action bar when rows are selected; receives the selected
     * rows' original data. Requires `enableRowSelection`. */
    bulkActions?: (selectedRows: TData[]) => React.ReactNode;
    /** Rendered when there are zero rows (after filtering). */
    emptyState?: React.ReactNode;
    /** Accessible caption / label for the table. */
    caption?: string;
    className?: string;
}
export declare function DataTable<TData, TValue>({ columns, columnsSpec, data, enableFiltering, enablePagination, pageSize, filterPlaceholder, toolbarActions, enableRowSelection, bulkActions, emptyState, caption, className, }: DataTableProps<TData, TValue>): React.JSX.Element;

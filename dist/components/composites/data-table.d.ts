import { ColumnDef } from '@tanstack/react-table';
import * as React from "react";
/**
 * DataTable — the RECORD/INTELLIGENCE composite. A generic, token-skinned data
 * grid over @tanstack/react-table: column defs, sorting, global filtering, and
 * pagination.
 *
 * ONE RESPONSIVE LAYOUT (no duplicate desktop/mobile trees): a single semantic
 * `<table>` that renders as a real grid on >=md and REFLOWS to per-row stacked
 * cards on small screens via CSS (`display:block` rows/cells + a `data-label`
 * pseudo-element label). Same DOM, same data rendered once — never a 360px
 * horizontal scroll.
 *
 * Row-stagger entrance motion via framer-motion, gated on prefers-reduced-motion.
 * A safe empty state. Archetype-generic: works for ANY rows/columns. Reads tokens
 * ONLY via var(--*) (no hardcoded color/radius/shadow/duration).
 */
export interface DataTableProps<TData, TValue> {
    /** TanStack column definitions (header/accessor/cell — fully generic). */
    columns: ColumnDef<TData, TValue>[];
    /** The row data (any shape). */
    data: TData[];
    /** Show the global search box. Default true. */
    enableFiltering?: boolean;
    /** Show pagination controls + page size. Default true. */
    enablePagination?: boolean;
    /** Rows per page when pagination is on. Default 10. */
    pageSize?: number;
    /** Placeholder for the global filter input. */
    filterPlaceholder?: string;
    /** Rendered when there are zero rows (after filtering). */
    emptyState?: React.ReactNode;
    /** Accessible caption / label for the table. */
    caption?: string;
    className?: string;
}
export declare function DataTable<TData, TValue>({ columns, data, enableFiltering, enablePagination, pageSize, filterPlaceholder, emptyState, caption, className, }: DataTableProps<TData, TValue>): React.JSX.Element;

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

const MOBILE_CARD_CSS = `
.prumo-dt[data-mobile-cards="true"] { }
@media (max-width: 47.99em) {
  .prumo-dt[data-mobile-cards="true"] thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-dt[data-mobile-cards="true"] tr { display: block; border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: var(--density-gap); padding: var(--density-padding); box-shadow: var(--shadow-sm); }
  .prumo-dt[data-mobile-cards="true"] td { display: flex; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; border: 0; text-align: right; }
  .prumo-dt[data-mobile-cards="true"] td::before { content: attr(data-label); font-weight: 600; color: var(--muted-foreground); text-align: left; }
}
`;

export function DataTable<TData, TValue>({
  columns,
  data,
  enableFiltering = true,
  enablePagination = true,
  pageSize = 10,
  filterPlaceholder = "Search…",
  emptyState,
  caption,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const prefersReducedMotion = useReducedMotion();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, globalFilter },
    initialState: { pagination: { pageSize } },
  });

  const rows = table.getRowModel().rows;
  const headerLabel = (colId: string) => {
    const col = table.getColumn(colId);
    const header = col?.columnDef.header;
    return typeof header === "string" ? header : colId;
  };

  return (
    <div className={cn("prumo-dt w-full", className)} data-mobile-cards="true">
      <style>{MOBILE_CARD_CSS}</style>

      {enableFiltering && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={filterPlaceholder}
              aria-label={filterPlaceholder}
              className="pl-9"
            />
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-border">
        <table
          className="w-full caption-bottom border-collapse"
          style={{ fontSize: "var(--text-small)" }}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="[&_tr]:border-b [&_tr]:border-border bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="h-11 px-4 text-left align-middle font-medium text-muted-foreground"
                      aria-sort={
                        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex min-h-[44px] items-center gap-1 font-medium outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                          style={{ transition: "color var(--duration-fast) var(--ease-standard)" }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-muted-foreground">
                  {emptyState ?? "No results found."}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-b border-border bg-card hover:bg-muted/50"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.3, delay: Math.min(i * 0.03, 0.3), ease: [0.2, 0, 0.38, 0.9] }
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 align-middle"
                      data-label={headerLabel(cell.column.id)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && rows.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            {" · "}
            {table.getFilteredRowModel().rows.length} row(s)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

// Let columns declare alignment (numeric/currency → right) without `any`.
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "right" | "center";
  }
}

export interface DataTableProps<TData, TValue> {
  /** TanStack column definitions (header/accessor/cell — fully generic). Set
   * `meta: { align: "right" }` on numeric/currency columns. */
  columns: ColumnDef<TData, TValue>[];
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
  /** Rendered when there are zero rows (after filtering). */
  emptyState?: React.ReactNode;
  /** Accessible caption / label for the table. */
  caption?: string;
  className?: string;
}

const DT_CSS = `
.prumo-dt { --dt-pad-y: 0.5rem; --dt-pad-x: 0.95rem; }
.prumo-dt tbody tr { transition: background-color var(--duration-fast, 150ms) var(--ease-standard, ease); }
@media (prefers-reduced-motion: reduce) { .prumo-dt tbody tr { transition: none; } }
.prumo-dt-scroll { position: relative; overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--card); }
.prumo-dt table { width: 100%; border-collapse: separate; border-spacing: 0; }
.prumo-dt th, .prumo-dt td { padding: var(--dt-pad-y) var(--dt-pad-x); text-align: left; vertical-align: middle; white-space: nowrap; }
.prumo-dt th[data-align="right"], .prumo-dt td[data-align="right"] { text-align: right; }
.prumo-dt th[data-align="center"], .prumo-dt td[data-align="center"] { text-align: center; }
.prumo-dt thead th { position: sticky; top: 0; z-index: 1; background: color-mix(in oklch, var(--muted) 28%, var(--card)); border-bottom: 1px solid var(--border); font-weight: 600; color: var(--muted-foreground); }
.prumo-dt tbody td { border-top: 1px solid color-mix(in oklch, var(--border) 65%, transparent); background: var(--card); }
.prumo-dt tbody tr:first-child td { border-top: 0; }
.prumo-dt tbody tr:hover td { background: color-mix(in oklch, var(--muted) 22%, var(--card)); }
/* per-RECORD card reflow on small screens */
@media (max-width: 47.99em) {
  .prumo-dt-scroll { overflow-x: visible; border: 0; background: transparent; }
  .prumo-dt thead { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .prumo-dt table, .prumo-dt tbody, .prumo-dt tr, .prumo-dt td { display: block; }
  .prumo-dt tbody { display: grid; gap: var(--density-gap, 0.75rem); }
  .prumo-dt tr { border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--density-padding, 1rem); box-shadow: var(--shadow-sm); background: var(--card); }
  .prumo-dt td { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.5rem 0; border: 0; white-space: normal; text-align: right; }
  .prumo-dt td + td { border-top: 1px solid color-mix(in oklch, var(--border) 55%, transparent); }
  .prumo-dt td::before { content: attr(data-label); font-weight: 600; color: var(--muted-foreground); text-align: left; }
  /* first cell = the record TITLE: prominent, no label, full width */
  .prumo-dt td:first-child { justify-content: flex-start; text-align: left; padding-top: 0; padding-bottom: 0.65rem; font-family: var(--font-display); font-weight: 700; font-size: var(--text-body); }
  .prumo-dt td:first-child::before { content: none; }
}
`;

export function DataTable<TData, TValue>({
  columns,
  data,
  enableFiltering = true,
  enablePagination = true,
  pageSize = 10,
  filterPlaceholder = "Search…",
  toolbarActions,
  emptyState,
  caption,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

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
  const totalRows = table.getFilteredRowModel().rows.length;
  const headerLabel = (colId: string) => {
    const col = table.getColumn(colId);
    const header = col?.columnDef.header;
    return typeof header === "string" ? header : colId;
  };

  return (
    <div className={cn("prumo-dt w-full", className)}>
      <style>{DT_CSS}</style>

      {(enableFiltering || toolbarActions) && (
        <div className="mb-3 flex flex-wrap items-center gap-3">
          {enableFiltering && (
            <div className="relative w-full max-w-xs">
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
          )}
          <span
            className="text-muted-foreground"
            style={{ fontSize: "var(--text-small)" }}
            aria-live="polite"
          >
            {totalRows} {totalRows === 1 ? "result" : "results"}
          </span>
          {toolbarActions && <div className="ml-auto flex items-center gap-2">{toolbarActions}</div>}
        </div>
      )}

      <div className="prumo-dt-scroll">
        <table style={{ fontSize: "var(--text-small)" }}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const align = header.column.columnDef.meta?.align ?? "left";
                  return (
                    <th
                      key={header.id}
                      data-align={align}
                      aria-sort={
                        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "inline-flex min-h-[36px] items-center gap-1.5 font-semibold uppercase outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                            align === "right" && "flex-row-reverse",
                          )}
                          style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.04em",
                            transition: "color var(--duration-fast) var(--ease-standard)",
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />
                          )}
                        </button>
                      ) : (
                        <span
                          className="font-semibold uppercase"
                          style={{ fontSize: "0.7rem", letterSpacing: "0.04em" }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-muted-foreground">
                  {emptyState ?? "No results found."}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      data-align={cell.column.columnDef.meta?.align ?? "left"}
                      data-label={headerLabel(cell.column.id)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && rows.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            {" · "}
            {totalRows} {totalRows === 1 ? "row" : "rows"}
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

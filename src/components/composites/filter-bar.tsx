import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

/**
 * FilterBar — narrow a collection by FACTS (CREATED; Phase 64 creation loop,
 * coverage-map gap #2, the "discover" step). A search field + the consumer's
 * filter controls + REMOVABLE active-filter chips + a result count + optional
 * sort. The prumo wedge: filters narrow FACTS, never rank — no "best match" sort
 * by a hidden quality score; chips are categorical, not verdicts.
 *
 * ONE RESPONSIVE LAYOUT: a single flex-wrap toolbar; the chip row appears beneath
 * when filters are active. `role="search"`; the count is `aria-live`; each
 * remove-chip carries an `aria-label`. Tokens via var(--*); composes the elevated
 * Input primitive.
 */
export interface ActiveFilter {
  id: string;
  /** The chip label, e.g. "Phase: Primary". */
  label: React.ReactNode;
  /** A plain-text name for the remove button's accessible label. */
  name?: string;
  onRemove: () => void;
}

export interface FilterBarProps {
  search?: { value: string; onChange: (value: string) => void; placeholder?: string };
  /** The consumer's filter controls (Selects / "+ filter" buttons). */
  filters?: React.ReactNode;
  /** Active filters rendered as removable chips. */
  activeFilters?: ActiveFilter[];
  onClearAll?: () => void;
  /** Result count (e.g. "12 schools"). */
  resultCount?: React.ReactNode;
  /** A sort control (a labelled Select — neutral keys only, never a quality rank). */
  sort?: React.ReactNode;
  /** Far-right actions (e.g. a view toggle). */
  actions?: React.ReactNode;
  divider?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function FilterBar({
  search,
  filters,
  activeFilters,
  onClearAll,
  resultCount,
  sort,
  actions,
  divider = false,
  className,
  "aria-label": ariaLabel,
}: FilterBarProps) {
  const hasChips = !!activeFilters && activeFilters.length > 0;
  return (
    <div role="search" aria-label={ariaLabel ?? "Filter"} className={cn("w-full", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {search && (
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder ?? "Search…"}
              aria-label={search.placeholder ?? "Search"}
              className="pl-9"
            />
          </div>
        )}
        {filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
        {(resultCount != null || sort || actions) && (
          <div className="ml-auto flex items-center gap-3">
            {resultCount != null && (
              <span aria-live="polite" className="tabular-nums text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                {resultCount}
              </span>
            )}
            {sort}
            {actions}
          </div>
        )}
      </div>

      {hasChips && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activeFilters!.map((f) => (
            <span
              key={f.id}
              className="inline-flex items-center gap-1 font-medium"
              style={{
                fontSize: "var(--text-small)",
                borderRadius: "var(--radius-sm)",
                padding: "0.25rem 0.35rem 0.25rem 0.6rem",
                background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
                color: "var(--foreground)",
              }}
            >
              {f.label}
              <button
                type="button"
                onClick={f.onRemove}
                aria-label={`Remove filter${f.name ? `: ${f.name}` : ""}`}
                className="-mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          ))}
          {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="ml-1 font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:underline"
              style={{ fontSize: "var(--text-small)" }}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {divider && <div aria-hidden="true" className="mt-3 h-px w-full" style={{ background: "var(--border)" }} />}
    </div>
  );
}

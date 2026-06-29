import { FilterSpec } from './field-specs';
import * as React from "react";
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
    search?: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
    /** The consumer's filter controls (Selects / "+ filter" buttons). Takes precedence
     * over `filterSpecs`. */
    filters?: React.ReactNode;
    /** Declarative filter controls (Phase 65 data alternative to `filters`, rendered as
     * search Inputs / Selects, so a pure-data ScreenPlan can drive the bar). Used only
     * when `filters` is absent. */
    filterSpecs?: FilterSpec[];
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
export declare function FilterBar({ search, filters, filterSpecs, activeFilters, onClearAll, resultCount, sort, actions, divider, className, "aria-label": ariaLabel, }: FilterBarProps): React.JSX.Element;

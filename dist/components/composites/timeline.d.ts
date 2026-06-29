import * as React from "react";
/**
 * Timeline — a vertical chronological activity/history feed (CREATED; Phase 64
 * creation loop, coverage-map gap #5). A connecting rail + a node (icon/dot) per
 * entry + title + timestamp + optional description. Semantic <ol>/<li>; the rail +
 * nodes are decorative (aria-hidden). Tokens via var(--*) only. Neutral nodes —
 * status color reserved for genuine status, never a "most important" verdict.
 */
export interface TimelineEntry {
    id: string;
    /** A lucide (or any) icon node for the rail node; falls back to a plain dot. */
    icon?: React.ReactNode;
    title: React.ReactNode;
    timestamp?: React.ReactNode;
    description?: React.ReactNode;
}
export interface TimelineProps {
    entries: TimelineEntry[];
    className?: string;
    "aria-label"?: string;
}
export declare function Timeline({ entries, className, "aria-label": ariaLabel }: TimelineProps): React.JSX.Element;

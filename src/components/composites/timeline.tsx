import * as React from "react";
import { cn } from "../../lib/utils";

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

export function Timeline({ entries, className, "aria-label": ariaLabel }: TimelineProps) {
  return (
    <ol aria-label={ariaLabel ?? "Activity"} className={cn("relative", className)}>
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        return (
          <li key={e.id} className={cn("relative flex gap-3", last ? "pb-0" : "pb-6")}>
            {/* rail — between this node and the next */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 top-8 w-px"
                style={{ left: "15.5px", background: "var(--border)" }}
              />
            )}
            {/* node */}
            <span
              aria-hidden="true"
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4"
              style={{
                borderRadius: "var(--radius-full, 9999px)",
                background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {e.icon ?? (
                <span style={{ height: "0.5rem", width: "0.5rem", borderRadius: "9999px", background: "var(--muted-foreground)" }} />
              )}
            </span>
            {/* content */}
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="font-medium text-foreground" style={{ fontSize: "var(--text-small)" }}>
                  {e.title}
                </p>
                {e.timestamp != null && (
                  <time className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                    {e.timestamp}
                  </time>
                )}
              </div>
              {e.description && (
                <p className="mt-0.5 text-muted-foreground" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
                  {e.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

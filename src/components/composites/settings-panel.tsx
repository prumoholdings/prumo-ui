import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * SettingsPanel — a grouped settings/preferences form (CREATED; Phase 64 archetype
 * completion). Labelled SECTIONS, each a list of rows (label + helper description on
 * the left, a control flush-right), hairline dividers between rows. The Linear
 * gold-standard: persist-on-change (no Save bar by default). A `stacked` row puts a
 * wide control below the label. Tokens via var(--*); composes the elevated controls.
 */
export interface SettingsRow {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** The control (Switch/Input/Select/…), rendered flush-right (or below if stacked). */
  control: React.ReactNode;
  /** Put the control BELOW the label (for wide inputs/textareas). Default false. */
  stacked?: boolean;
}

export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  rows: SettingsRow[];
}

export interface SettingsPanelProps {
  sections: SettingsSection[];
  className?: string;
  "aria-label"?: string;
}

export function SettingsPanel({ sections, className, "aria-label": ariaLabel }: SettingsPanelProps) {
  return (
    <div className={cn("flex w-full flex-col gap-10", className)} aria-label={ariaLabel}>
      {sections.map((s) => (
        <section key={s.id} aria-label={s.title}>
          <h2
            className="font-semibold text-foreground"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
          >
            {s.title}
          </h2>
          {s.description && (
            <p className="mt-1 max-w-prose text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
              {s.description}
            </p>
          )}
          <div className="mt-4 flex flex-col">
            {s.rows.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "gap-4 py-4",
                  r.stacked ? "flex flex-col" : "flex flex-wrap items-center justify-between",
                )}
                style={
                  i > 0
                    ? { borderTop: "1px solid color-mix(in oklch, var(--border) 70%, transparent)" }
                    : undefined
                }
              >
                <div className="min-w-0 max-w-prose">
                  <div className="font-medium text-foreground" style={{ fontSize: "var(--text-small)" }}>
                    {r.label}
                  </div>
                  {r.description && (
                    <p className="mt-0.5 text-muted-foreground" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                      {r.description}
                    </p>
                  )}
                </div>
                <div className={cn("shrink-0", r.stacked && "w-full max-w-sm")}>{r.control}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

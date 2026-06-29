import * as React from "react";
import { cn } from "../../lib/utils";
import { type AsideSpec, renderAsideSpec } from "./field-specs";

/**
 * DetailView — one entity's full page (CREATED; Phase 64 creation loop, coverage-map
 * gap #3, the "decide" step). A header (typically a PageHeader) + an optional media
 * hero + grouped, SOURCED label·value fact SECTIONS + an optional sticky aside
 * (actions / summary). The prumo wedge: facts + provenance, NEVER an aggregate
 * score / grade / "recommended" verdict (compare is a separate anti-ranking action).
 *
 * ONE RESPONSIVE LAYOUT: a 2-column body (main + aside) that stacks on mobile from
 * one DOM. Facts are a semantic <dl>. Tokens via var(--*) only.
 */
export interface DetailFact {
  label: string;
  value?: React.ReactNode;
}

export interface DetailSection {
  id: string;
  title: string;
  description?: string;
  /** label·value facts (rendered as a 2-col <dl>). */
  facts?: DetailFact[];
  /** Arbitrary section content (e.g. a chart, a map). */
  children?: React.ReactNode;
}

export interface DetailViewProps {
  /** The page header (typically a PageHeader). */
  header?: React.ReactNode;
  /** An optional hero/media block above the sections. */
  media?: React.ReactNode;
  sections: DetailSection[];
  /** An optional sticky aside (a summary / actions card). Takes precedence over `asideSpec`. */
  aside?: React.ReactNode;
  /** A declarative summary/actions aside (Phase 65 data alternative to `aside`, so a
   * pure-data ScreenPlan can drive it). Used only when `aside` is absent. */
  asideSpec?: AsideSpec;
  /** A provenance footer (the sourced wedge). */
  source?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function DetailView({
  header,
  media,
  sections,
  aside,
  asideSpec,
  source,
  className,
  "aria-label": ariaLabel,
}: DetailViewProps) {
  const resolvedAside = aside ?? renderAsideSpec(asideSpec);
  return (
    <div className={cn("w-full", className)} aria-label={ariaLabel}>
      {header}
      <div className={cn("mt-6 grid gap-8", resolvedAside && "lg:grid-cols-[minmax(0,1fr)_320px]")}>
        <div className="min-w-0 space-y-8">
          {media}
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
              {s.facts && s.facts.length > 0 && (
                <dl className="mt-3 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {s.facts.map((f, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-0.5 py-3"
                      style={{ borderTop: "1px solid color-mix(in oklch, var(--border) 70%, transparent)" }}
                    >
                      <dt className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                        {f.label}
                      </dt>
                      <dd className="font-medium text-foreground">
                        {f.value ?? (
                          <span className="text-muted-foreground">
                            <span aria-hidden="true">—</span>
                            <span className="sr-only">Not available</span>
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.children && <div className="mt-3">{s.children}</div>}
            </section>
          ))}
          {source && (
            <p
              className="border-t pt-4 text-muted-foreground"
              style={{ fontSize: "var(--text-small)", borderColor: "var(--border)" }}
            >
              {source}
            </p>
          )}
        </div>

        {resolvedAside && <aside className="h-fit lg:sticky lg:top-4">{resolvedAside}</aside>}
      </div>
    </div>
  );
}

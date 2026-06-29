import * as React from "react";
import { cn } from "../../lib/utils";
import { type ActionSpec, renderActionSpecs } from "./field-specs";

/**
 * PageHeader — the screen's header region (CREATED, not elevated; Phase 64
 * creation loop). Orients the user (breadcrumb → title → description/meta) and
 * surfaces the screen's primary actions. The dominant shipped pattern
 * (Linear/Stripe/Vercel/Notion): TITLE-LEFT + ACTIONS-RIGHT, an optional
 * breadcrumb/eyebrow above, an optional one-line description or a factual META
 * strip beneath, an optional tab row (passed as children), and a hairline divider
 * closing the band.
 *
 * The prumo twist: an editorial display title + an optional SOURCED meta strip
 * (the provenance wedge — facts, never a "recommended"/winner verdict).
 *
 * ONE RESPONSIVE LAYOUT: a single flex row that wraps the actions below the title
 * on narrow screens. Tokens via var(--*) only. A `<header>` landmark; the title is
 * the page heading (`as` controls the level; default h1).
 */
export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Rendered above the title (e.g. a Breadcrumb or a back link). */
  breadcrumb?: React.ReactNode;
  /** Rendered on the right (e.g. secondary + primary Buttons). Wraps on mobile.
   * Takes precedence over `actionSpecs`. */
  actions?: React.ReactNode;
  /** Declarative actions (Phase 65 data alternative to `actions`, rendered as Buttons,
   * so a pure-data ScreenPlan can drive the header). Used only when `actions` is absent. */
  actionSpecs?: ActionSpec[];
  /** A factual strip under the title (counts / location / sourced provenance). */
  meta?: React.ReactNode;
  /** The title heading element — a page header is usually the page `<h1>`. */
  as?: "h1" | "h2";
  /** A hairline divider closing the header band. Default true. */
  divider?: boolean;
  /** Rendered beneath the band (e.g. a Tabs row). */
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  actionSpecs,
  meta,
  as: Heading = "h1",
  divider = true,
  children,
  className,
  "aria-label": ariaLabel,
}: PageHeaderProps) {
  return (
    <header className={cn("w-full", className)} aria-label={ariaLabel}>
      {breadcrumb && (
        <nav
          aria-label="Breadcrumb"
          className="mb-2 text-muted-foreground"
          style={{ fontSize: "var(--text-small)" }}
        >
          {breadcrumb}
        </nav>
      )}

      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <Heading
            className="text-balance font-semibold text-foreground"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: 1.15 }}
          >
            {title}
          </Heading>
          {description && (
            <p className="mt-1.5 max-w-prose text-muted-foreground" style={{ fontSize: "var(--text-body)" }}>
              {description}
            </p>
          )}
          {meta && (
            <div
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground"
              style={{ fontSize: "var(--text-small)" }}
            >
              {meta}
            </div>
          )}
        </div>

        {(actions || (actionSpecs && actionSpecs.length > 0)) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions ?? renderActionSpecs(actionSpecs)}
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}
      {divider && <div aria-hidden="true" className="mt-4 h-px w-full" style={{ background: "var(--border)" }} />}
    </header>
  );
}

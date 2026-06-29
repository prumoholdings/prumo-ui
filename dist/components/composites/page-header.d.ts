import { ActionSpec } from './field-specs';
import * as React from "react";
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
export declare function PageHeader({ title, description, breadcrumb, actions, actionSpecs, meta, as: Heading, divider, children, className, "aria-label": ariaLabel, }: PageHeaderProps): React.JSX.Element;

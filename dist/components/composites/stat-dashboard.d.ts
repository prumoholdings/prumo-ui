import * as React from "react";
/**
 * StatDashboard — the INTELLIGENCE composite (KPI stat cards + charts). A
 * responsive grid of KPI cards (1 col -> N as width allows) over an optional
 * chart, all token-skinned. Charts render via @tremor/react and read their series
 * colors from the canonical token contract (via useTokenColors) — a per-concept
 * `:root` retunes the charts too. No hardcoded color.
 *
 * ANTI-RANKING DELTA: a delta is shown FACTUALLY — a direction ARROW + the signed
 * magnitude, in a MUTED treatment. It is NOT colored good(green)/bad(red): a
 * generic dashboard cannot know the "good" direction (revenue up is good; churn
 * down is good), so verdict-coloring deltas would be both anti-ranking and often
 * wrong. (The restrained shipped bar — Stripe, Vercel — is likewise neutral.) An
 * optional token-colored SPARKLINE shows the trend SHAPE on-brand, never red/green.
 *
 * MOTION (C8): a subtle KPI reveal-stagger on mount (intelligence reveal),
 * token-driven, reduced-motion gated. Safe empty state. Archetype-generic.
 */
export interface StatKpi {
    /** KPI label. */
    label: string;
    /** The headline value (already formatted, or a number). */
    value: React.ReactNode;
    /** Optional delta as a signed percentage (e.g. 12.5 or -3.1). Shown neutrally. */
    deltaPct?: number;
    /** Optional trend series for a small on-brand sparkline. */
    spark?: number[];
    /** Optional supporting line. */
    hint?: string;
}
export type ChartKind = "area" | "bar" | "line" | "donut" | "funnel";
export interface StatChartSpec {
    kind: ChartKind;
    /** Recharts-style row data. */
    data: Record<string, string | number>[];
    /** The category key for the x-axis (area/bar/line). */
    index?: string;
    /** The numeric series keys to plot (area/bar/line). */
    categories?: string[];
    /** For a donut: the value key + the category key. */
    category?: string;
    /** Contract color tokens to drive the series. Default ["primary","accent"]. */
    colorTokens?: string[];
    /** Optional chart title. */
    title?: string;
}
export interface StatDashboardProps {
    kpis: StatKpi[];
    chart?: StatChartSpec;
    /** KPI columns at the widest breakpoint (CSS reflows down). Default 4. */
    columns?: 2 | 3 | 4;
    emptyState?: React.ReactNode;
    className?: string;
    "aria-label"?: string;
}
export declare function StatDashboard({ kpis, chart, columns, emptyState, className, "aria-label": ariaLabel, }: StatDashboardProps): React.JSX.Element;

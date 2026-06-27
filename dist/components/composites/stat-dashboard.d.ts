import * as React from "react";
/**
 * StatDashboard — the INTELLIGENCE composite (KPI stat cards + charts). A
 * responsive grid of KPI cards (1 col -> N as width allows) over an optional
 * chart, all token-skinned. Charts render via @tremor/react and read their
 * series colors from the canonical token contract (resolved off the host via
 * useTokenColors) — so a per-concept `:root` retunes the charts too. No hardcoded
 * color. KPI cards stagger in on mount, gated on prefers-reduced-motion. Safe
 * empty state. Archetype-generic.
 */
export interface StatKpi {
    /** KPI label. */
    label: string;
    /** The headline value (already formatted, or a number). */
    value: React.ReactNode;
    /** Optional delta as a signed percentage (e.g. 12.5 or -3.1). */
    deltaPct?: number;
    /** Optional supporting line. */
    hint?: string;
}
export type ChartKind = "area" | "bar" | "line" | "donut";
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

import * as React from "react";
import { AreaChart, BarChart, DonutChart, LineChart } from "@tremor/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTokenColors } from "../../lib/use-token-colors";

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

function DeltaPill({ deltaPct }: { deltaPct: number }) {
  const up = deltaPct >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium",
        up ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive",
      )}
      style={{ fontSize: "var(--text-small)" }}
    >
      {up ? (
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {Math.abs(deltaPct).toFixed(1)}%
      <span className="sr-only">{up ? "increase" : "decrease"}</span>
    </span>
  );
}

const COL_CLASS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

function TokenChart({ spec }: { spec: StatChartSpec }) {
  const tokens = spec.colorTokens ?? ["primary", "accent"];
  const [ref, colors] = useTokenColors(tokens);
  const common = {
    data: spec.data,
    colors,
    showAnimation: false as const,
    className: "h-64 mt-2",
  };
  return (
    <div ref={ref}>
      {spec.title && (
        <h3 className="mb-1 font-medium text-foreground" style={{ fontSize: "var(--text-body)" }}>
          {spec.title}
        </h3>
      )}
      {spec.kind === "area" && (
        <AreaChart {...common} index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "bar" && (
        <BarChart {...common} index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "line" && (
        <LineChart {...common} index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "donut" && (
        <DonutChart {...common} index={spec.index ?? "name"} category={spec.category ?? "value"} />
      )}
    </div>
  );
}

export function StatDashboard({
  kpis,
  chart,
  columns = 4,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: StatDashboardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (kpis.length === 0 && !chart) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          className,
        )}
      >
        {emptyState ?? "No metrics to show."}
      </div>
    );
  }

  return (
    <section className={cn("w-full", className)} aria-label={ariaLabel ?? "Dashboard"}>
      {kpis.length > 0 && (
        <div className={cn("grid gap-[var(--density-gap)]", COL_CLASS[columns])}>
          {kpis.map((kpi, i) => (
            <motion.div
              key={`${kpi.label}-${i}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, delay: Math.min(i * 0.05, 0.3), ease: [0, 0, 0.38, 0.9] }
              }
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle
                    className="font-medium text-muted-foreground"
                    style={{ fontSize: "var(--text-small)", fontFamily: "var(--font-body)" }}
                  >
                    {kpi.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-semibold text-foreground tabular-nums"
                      style={{ fontSize: "var(--text-h2)", fontFamily: "var(--font-display)" }}
                    >
                      {kpi.value}
                    </span>
                    {typeof kpi.deltaPct === "number" && <DeltaPill deltaPct={kpi.deltaPct} />}
                  </div>
                  {kpi.hint && (
                    <p className="mt-1 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                      {kpi.hint}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {chart && (
        <Card className="mt-[var(--density-gap)]">
          <CardContent className="pt-6">
            <TokenChart spec={chart} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}

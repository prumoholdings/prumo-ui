import * as React from "react";
import { AreaChart, BarChart, LineChart } from "@tremor/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { DURATION, EASE } from "../../lib/motion";

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

/** A FACTUAL delta: direction arrow + signed magnitude, MUTED — never colored
 * good/bad (anti-ranking; direction is not goodness). */
function DeltaIndicator({ deltaPct }: { deltaPct: number }) {
  const up = deltaPct >= 0;
  return (
    <span
      className="inline-flex items-center gap-0.5 font-medium text-muted-foreground tabular-nums"
      style={{ fontSize: "var(--text-small)" }}
    >
      {up ? (
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {Math.abs(deltaPct).toFixed(1)}%
      <span className="sr-only">{up ? "up" : "down"} from the previous period</span>
    </span>
  );
}

/* Catmull-Rom → cubic-bezier smoothing: a SMOOTH curve through the points (not an
 * angular polyline). Tension 1/6 is the standard cardinal-spline value. */
function smoothLinePath(pts: ReadonlyArray<readonly [number, number]>): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/** A tiny on-brand sparkline (inline SVG): a SMOOTH curve with a soft gradient
 * fade. Token-colored (var(--primary)), neutral — shows the trend SHAPE factually,
 * never red/green by direction. */
function Sparkline({ data }: { data: number[] }) {
  const rawId = React.useId();
  const gid = `spark-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  if (data.length < 2) return null;
  const w = 84;
  const h = 30;
  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = smoothLinePath(pts);
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${h} L${pts[0][0].toFixed(1)},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COL_CLASS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/** A SMOOTH custom donut (Tremor's donut has square-cornered segments + hard gaps,
 * and the oklch color bug). Rendered as stroked arcs with ROUNDED caps + soft
 * padding over a muted track ring; brand-token colored. Fully token-driven. */
function SmoothDonut({
  data,
  indexKey,
  categoryKey,
  tokens,
}: {
  data: Record<string, string | number>[];
  indexKey: string;
  categoryKey: string;
  tokens: string[];
}) {
  const items = data.map((d, i) => ({
    name: String(d[indexKey]),
    value: Number(d[categoryKey]) || 0,
    color: `var(--${tokens[i % tokens.length]})`,
  }));
  const total = items.reduce((s, it) => s + it.value, 0) || 1;
  const size = 224;
  const stroke = 24;
  const r = (size - stroke) / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const gapPx = stroke * 1.4; // > cap radius so rounded ends leave an even gap
  let acc = 0;
  return (
    <div className="flex items-center justify-center py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribution">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="color-mix(in oklch, var(--muted) 45%, var(--card))"
          strokeWidth={stroke}
        />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {items.map((it, i) => {
            const frac = it.value / total;
            const seg = frac * circ;
            const len = Math.max(seg - gapPx, 0.001);
            const offset = acc + gapPx / 2;
            acc += seg;
            return (
              <circle
                key={`${it.name}-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={it.color}
                strokeWidth={stroke}
                strokeDasharray={`${len.toFixed(2)} ${(circ - len).toFixed(2)}`}
                strokeDashoffset={(-offset).toFixed(2)}
                strokeLinecap="round"
              />
            );
          })}
        </g>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600, fill: "var(--foreground)" }}
        >
          {total}
        </text>
      </svg>
    </div>
  );
}

/* Safe Tremor palette NAMES used only as placeholders so Tremor renders valid SVG
 * (our oklch tokens break Tremor's color->gradient-id). The real, brand-token
 * colors are painted onto the recharts series below. */
/**
 * Funnel — a token-driven horizontal-bar funnel (stage label + value + conversion%
 * + a bar whose width ∝ value, decreasing down the stages). Like SmoothDonut it is a
 * pure token render (Tremor can't consume oklch). Neutral/factual drop-off — it shows
 * stage progression, never good/bad (anti-ranking).
 */
function Funnel({
  data,
  indexKey,
  categoryKey,
  tokens,
}: {
  data: Record<string, string | number>[];
  indexKey: string;
  categoryKey: string;
  tokens: string[];
}) {
  const stages = data.map((d) => ({ label: String(d[indexKey]), value: Number(d[categoryKey]) || 0 }));
  const max = Math.max(...stages.map((s) => s.value), 1);
  const first = stages[0]?.value || 1;
  return (
    <ol className="mt-2 flex flex-col gap-3">
      {stages.map((s, i) => {
        const widthPct = (s.value / max) * 100;
        const conv = i === 0 ? 100 : (s.value / first) * 100;
        return (
          <li key={i}>
            <div className="flex items-baseline justify-between gap-2" style={{ fontSize: "var(--text-small)" }}>
              <span className="font-medium text-foreground">{s.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {s.value.toLocaleString()}
                {i > 0 && <span className="ml-1.5">· {conv.toFixed(0)}%</span>}
              </span>
            </div>
            <div
              className="mt-1 h-7 w-full overflow-hidden"
              style={{ borderRadius: "var(--radius-md)", background: "color-mix(in oklch, var(--muted) 38%, var(--card))" }}
            >
              <div
                className="h-full transition-[width]"
                style={{
                  width: `${widthPct}%`,
                  minWidth: s.value > 0 ? "0.25rem" : 0,
                  borderRadius: "var(--radius-md)",
                  // subtle gradient lift (srgb, not oklch — M1) to soften the utilitarian flat fill.
                  background: `linear-gradient(90deg, var(--${tokens[0] ?? "primary"}), color-mix(in srgb, var(--${tokens[0] ?? "primary"}) 80%, var(--card)))`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const CHART_SLOTS = ["blue", "cyan", "amber", "violet", "emerald", "rose"];

/**
 * TokenChart — a Tremor chart whose series are driven by the brand TOKEN contract.
 * Tremor's `colors` prop cannot consume `oklch(...)` (it embeds the color string in
 * an SVG gradient id, which becomes an invalid `url(#...)` and renders black). So
 * Tremor renders with safe placeholder names and we PAINT the recharts series
 * (`fill`/`stroke` accept `oklch` via the CSSOM) from the resolved `var(--token)`
 * values — re-applied on re-render/resize so a per-concept `:root` retunes charts
 * like everything else. No hardcoded color.
 */
function TokenChart({ spec }: { spec: StatChartSpec }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const tokens = spec.colorTokens ?? ["primary", "accent"];
  const tokenKey = tokens.join(",");
  const seriesCount = spec.kind === "donut" ? spec.data.length : spec.categories?.length ?? 1;
  const placeholders = CHART_SLOTS.slice(0, Math.max(seriesCount, 1));

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const resolve = () => {
      const cs = getComputedStyle(el);
      return tokens.map((t) => cs.getPropertyValue(`--${t}`).trim() || `var(--${t})`);
    };
    const paint = () => {
      const colors = resolve();
      const pick = (i: number) => colors[i % colors.length];
      el.querySelectorAll<SVGElement>(".recharts-area").forEach((g, i) => {
        g.querySelectorAll<SVGElement>(".recharts-area-area").forEach((p) => {
          p.style.fill = pick(i);
          p.style.fillOpacity = "0.16";
        });
        g.querySelectorAll<SVGElement>(".recharts-area-curve").forEach((p) => {
          p.style.stroke = pick(i);
          p.style.fill = "none";
        });
      });
      el.querySelectorAll<SVGElement>(".recharts-line").forEach((g, i) => {
        g.querySelectorAll<SVGElement>(".recharts-line-curve").forEach((p) => {
          p.style.stroke = pick(i);
        });
      });
      el.querySelectorAll<SVGElement>(".recharts-bar").forEach((g, i) => {
        g.querySelectorAll<SVGElement>(".recharts-bar-rectangle path, .recharts-rectangle").forEach((p) => {
          p.style.fill = pick(i);
        });
      });
      // donut/pie: colored per slice
      el
        .querySelectorAll<SVGElement>(".recharts-pie-sector path, .recharts-pie .recharts-sector")
        .forEach((p, i) => {
          p.style.fill = pick(i);
          p.style.stroke = "var(--card)";
        });
    };
    paint();
    const mo = new MutationObserver(() => paint());
    mo.observe(el, { childList: true, subtree: true });
    const ro = new ResizeObserver(() => paint());
    ro.observe(el);
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec.kind, JSON.stringify(spec.data), tokenKey]);

  const common = {
    data: spec.data,
    colors: placeholders,
    showAnimation: false as const,
    showLegend: false as const,
    className: "h-64 mt-2",
  };
  // Our OWN token-colored legend (Tremor's legend has the same oklch-gradient bug).
  const legendItems =
    spec.kind === "donut"
      ? spec.data.map((d) => String(d[spec.index ?? "name"]))
      : spec.categories ?? [];
  return (
    <div ref={ref}>
      {spec.title && (
        <h3 className="mb-2 font-semibold text-foreground" style={{ fontSize: "var(--text-body)", fontFamily: "var(--font-display)" }}>
          {spec.title}
        </h3>
      )}
      {legendItems.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ fontSize: "var(--text-small)" }}>
          {legendItems.map((cat, i) => (
            <span key={`${cat}-${i}`} className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: `var(--${tokens[i % tokens.length]})` }}
              />
              {cat}
            </span>
          ))}
        </div>
      )}
      {spec.kind === "area" && (
        <AreaChart {...common} curveType="monotone" index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "bar" && (
        <BarChart {...common} index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "line" && (
        <LineChart {...common} curveType="monotone" index={spec.index ?? "date"} categories={spec.categories ?? []} />
      )}
      {spec.kind === "donut" && (
        <SmoothDonut
          data={spec.data}
          indexKey={spec.index ?? "name"}
          categoryKey={spec.category ?? "value"}
          tokens={tokens}
        />
      )}
      {spec.kind === "funnel" && (
        <Funnel
          data={spec.data}
          indexKey={spec.index ?? "name"}
          categoryKey={spec.category ?? "value"}
          tokens={tokens}
        />
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
        style={{ borderRadius: "var(--radius-lg)" }}
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: DURATION.base, delay: Math.min(i * 0.05, 0.3), ease: EASE.entrance }
              }
            >
              <Card className="h-full">
                <div className="flex h-full flex-col gap-2" style={{ padding: "1.1rem 1.2rem" }}>
                  <p
                    className="font-semibold uppercase text-muted-foreground"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                  >
                    {kpi.label}
                  </p>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className="font-semibold text-foreground tabular-nums"
                        style={{ fontSize: "var(--text-h2)", fontFamily: "var(--font-display)", lineHeight: 1 }}
                      >
                        {kpi.value}
                      </span>
                      {typeof kpi.deltaPct === "number" && <DeltaIndicator deltaPct={kpi.deltaPct} />}
                    </div>
                    {kpi.spark && kpi.spark.length > 1 && <Sparkline data={kpi.spark} />}
                  </div>
                  {kpi.hint && (
                    <p className="text-muted-foreground" style={{ fontSize: "var(--text-small)", marginTop: "auto" }}>
                      {kpi.hint}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {chart && (
        <Card className="mt-[var(--density-gap)]">
          <div style={{ padding: "1.25rem 1.2rem" }}>
            <TokenChart spec={chart} />
          </div>
        </Card>
      )}
    </section>
  );
}

import * as React from "react";
import { icons as lucideIcons } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

/**
 * Declarative FIELD-SPECS (Phase 65 — render-compose-only-emit).
 *
 * The screen-author emits a pure-DATA ScreenPlan; a deterministic harness turns it
 * into `<Component {...props} />`. For that to work, the function/node-prop composites
 * need a DATA alternative to their render functions. These specs + helpers are that
 * alternative: every input is JSON-serializable (string/number/bool/array — NO
 * functions, NO JSX), and the helpers render them through the elevated primitives.
 *
 * ADDITIVE + backward-compatible: a composite that has BOTH a function/node prop and
 * its data spec lets the function/node WIN (consumer override). Tokens via var(--*).
 */

// ─────────────────────────────────────────────────────────────────────────────
// Shared spec types
// ─────────────────────────────────────────────────────────────────────────────

export type ActionVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

/** A declarative button (renders a Button; render-only — no onClick in a data spec). */
export interface ActionSpec {
  label: string;
  variant?: ActionVariant;
  /** A lucide icon NAME (e.g. "ArrowRight"); resolved internally. */
  icon?: string;
  /** An optional link target (the spec carries no event handlers). */
  href?: string;
}

export type BadgeTone = "neutral" | "accent" | "muted";

export interface CardFieldSpec {
  label: string;
  /** The item key whose value is shown. */
  key: string;
}

export interface CardBadgeSpec {
  /** The item key whose value becomes the badge text. */
  key: string;
  tone?: BadgeTone;
}

/** A declarative card the component renders per item (alternative to renderItem). */
export interface CardSpec {
  /** A literal title; OR set `titleKey` to pull the title from the item. */
  title?: string;
  titleKey?: string;
  subtitleKey?: string;
  /** An item key holding an image URL. */
  mediaKey?: string;
  fields?: CardFieldSpec[];
  badges?: CardBadgeSpec[];
  actions?: ActionSpec[];
}

export type ColumnFormat =
  | "text"
  | "number"
  | "currency"
  | "percent"
  | "badge"
  | "date";

/** A declarative table column (alternative to a TanStack ColumnDef with a cell fn). */
export interface ColumnSpec {
  /** Accessor key on the row. */
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  format?: ColumnFormat;
  /** ISO currency code for format="currency" (default USD). */
  currency?: string;
}

/** A declarative filter control (render-only; no callbacks in a data spec). */
export interface FilterSpec {
  id: string;
  kind: "search" | "select";
  label: string;
  /** For kind="select". */
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface AsideFactSpec {
  label: string;
  value: string;
}

/** A declarative summary/actions aside card (alternative to a node `aside`). */
export interface AsideSpec {
  title?: string;
  facts?: AsideFactSpec[];
  actions?: ActionSpec[];
}

type Item = Record<string, unknown>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const ICONS = lucideIcons as Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
>;

/** Resolve a lucide icon NAME → a small icon node (graceful: unknown → null). */
export function resolveIcon(name?: string): React.ReactNode {
  if (!name) return null;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const Ico = ICONS[pascal] ?? ICONS[name];
  return Ico ? <Ico className="h-4 w-4" aria-hidden /> : null;
}

function field(item: Item, key?: string): string | undefined {
  if (!key) return undefined;
  const v = item?.[key];
  return v == null || v === "" ? undefined : String(v);
}

function badgeVariantFor(tone?: BadgeTone): "default" | "accent" | "secondary" {
  return tone === "accent" ? "accent" : tone === "muted" ? "secondary" : "default";
}

/** Render a list of ActionSpecs as Buttons (primary on the RIGHT — the dominant pattern). */
export function renderActionSpecs(actions?: ActionSpec[]): React.ReactNode {
  if (!actions || actions.length === 0) return null;
  return actions.map((a, i) => {
    const variant: ActionVariant =
      a.variant ?? (i === actions.length - 1 ? "default" : "outline");
    const inner = (
      <>
        {resolveIcon(a.icon)}
        {a.label}
      </>
    );
    return a.href ? (
      <Button key={i} variant={variant} asChild>
        <a href={a.href}>{inner}</a>
      </Button>
    ) : (
      <Button key={i} type="button" variant={variant}>
        {inner}
      </Button>
    );
  });
}

/** Render a declarative card for one item (CardCollection.card / Board.cardSpec). */
export function renderCardSpec(spec: CardSpec, item: Item): React.ReactNode {
  const title = spec.titleKey ? field(item, spec.titleKey) : spec.title;
  const subtitle = field(item, spec.subtitleKey);
  const media = field(item, spec.mediaKey);
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {media && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={media} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {title && (
              <h3
                className="font-semibold text-foreground"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body)" }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                {subtitle}
              </p>
            )}
          </div>
          {spec.badges && spec.badges.length > 0 && (
            <div className="flex shrink-0 flex-wrap gap-1.5">
              {spec.badges.map((b, i) => {
                const val = field(item, b.key);
                return val ? (
                  <Badge key={i} variant={badgeVariantFor(b.tone)}>
                    {val}
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </div>
        {spec.fields && spec.fields.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
            {spec.fields.map((f, i) => (
              <div key={i} className="flex flex-col">
                <dt className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                  {f.label}
                </dt>
                <dd
                  className="font-medium text-foreground"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  {field(item, f.key) ?? "—"}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {spec.actions && spec.actions.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {renderActionSpecs(spec.actions)}
          </div>
        )}
      </div>
    </Card>
  );
}

function formatCellValue(value: unknown, spec: ColumnSpec): React.ReactNode {
  if (value == null || value === "") {
    return (
      <span className="text-muted-foreground">
        <span aria-hidden>—</span>
        <span className="sr-only">Not available</span>
      </span>
    );
  }
  switch (spec.format) {
    case "number":
      return <span className="tabular-nums">{Number(value).toLocaleString()}</span>;
    case "currency":
      return (
        <span className="tabular-nums">
          {Number(value).toLocaleString(undefined, {
            style: "currency",
            currency: spec.currency ?? "USD",
            maximumFractionDigits: 0,
          })}
        </span>
      );
    case "percent":
      return <span className="tabular-nums">{Number(value)}%</span>;
    case "badge":
      return <Badge variant="secondary">{String(value)}</Badge>;
    case "date":
    case "text":
    default:
      return <span>{String(value)}</span>;
  }
}

/** Build TanStack column defs from declarative ColumnSpecs (DataTable.columnsSpec). */
export function buildColumnsFromSpec<TRow extends Item>(
  specs: ColumnSpec[],
): ColumnDef<TRow, unknown>[] {
  return specs.map((c) => {
    const numeric = c.format === "number" || c.format === "currency" || c.format === "percent";
    return {
      accessorKey: c.key,
      header: c.header,
      meta: { align: c.align ?? (numeric ? "right" : "left") },
      cell: (ctx) => formatCellValue(ctx.getValue(), c),
    } as ColumnDef<TRow, unknown>;
  });
}

/** Render declarative filter controls (FilterBar.filterSpecs — render-only visuals). */
export function renderFilterSpecs(specs?: FilterSpec[]): React.ReactNode {
  if (!specs || specs.length === 0) return null;
  return specs.map((f) =>
    f.kind === "search" ? (
      <Input
        key={f.id}
        placeholder={f.placeholder ?? f.label}
        aria-label={f.label}
        className="w-full max-w-[16rem]"
      />
    ) : (
      <Select key={f.id}>
        <SelectTrigger className="w-[11rem]" aria-label={f.label}>
          <SelectValue placeholder={f.placeholder ?? f.label} />
        </SelectTrigger>
        <SelectContent>
          {(f.options ?? []).map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  );
}

/** Render a declarative summary/actions aside card (DetailView.asideSpec). */
export function renderAsideSpec(spec?: AsideSpec): React.ReactNode {
  if (!spec) return null;
  return (
    <Card className={cn("p-5")}>
      {spec.title && (
        <h3
          className="mb-3 font-semibold text-foreground"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-body)" }}
        >
          {spec.title}
        </h3>
      )}
      {spec.facts && spec.facts.length > 0 && (
        <dl className="space-y-2.5">
          {spec.facts.map((f, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <dt className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                {f.label}
              </dt>
              <dd
                className="text-right font-medium text-foreground"
                style={{ fontSize: "var(--text-small)" }}
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {spec.actions && spec.actions.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">{renderActionSpecs(spec.actions)}</div>
      )}
    </Card>
  );
}

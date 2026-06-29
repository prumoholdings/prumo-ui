import * as React from "react";
import { cn } from "../../lib/utils";
import { type ActionSpec, resolveIcon, renderActionSpecs } from "./field-specs";

/**
 * EmptyState — the calm placeholder for a collection/table/search with no items
 * (CREATED; Phase 64 creation loop, coverage-map gap #4). Promotes the inline
 * empty-pattern the composites each carried into ONE reusable primitive: a centered
 * muted icon chip → title → one-line description → optional CTA. Never a blank or a
 * broken skeleton (no-silent-skeleton). Tokens via var(--*) only.
 */
export interface EmptyStateProps {
  /** A lucide (or any) icon node — shown in a soft round chip. Takes precedence over `iconName`. */
  icon?: React.ReactNode;
  /** A lucide icon NAME (Phase 65 data alternative to `icon`). Used when `icon` is absent. */
  iconName?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** CTA button(s). Takes precedence over `actionSpec`. */
  action?: React.ReactNode;
  /** A declarative CTA (Phase 65 data alternative to `action`). Used when `action` is absent. */
  actionSpec?: ActionSpec;
  /** `sm` for inline-in-card; `default` for a full panel. */
  size?: "sm" | "default";
  className?: string;
}

export function EmptyState({
  icon,
  iconName,
  title,
  description,
  action,
  actionSpec,
  size = "default",
  className,
}: EmptyStateProps) {
  const resolvedIcon = icon ?? resolveIcon(iconName);
  const resolvedAction = action ?? (actionSpec ? renderActionSpecs([actionSpec]) : null);
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "default" ? "px-6 py-16" : "px-4 py-10",
        className,
      )}
    >
      {resolvedIcon && (
        <div
          aria-hidden="true"
          className="mb-4 flex items-center justify-center [&_svg]:h-6 [&_svg]:w-6"
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "var(--radius-lg)",
            background: "color-mix(in oklch, var(--muted) 60%, var(--card))",
            color: "var(--muted-foreground)",
          }}
        >
          {resolvedIcon}
        </div>
      )}
      <h3 className="font-semibold text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}>
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-muted-foreground" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      {resolvedAction && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{resolvedAction}</div>
      )}
    </div>
  );
}

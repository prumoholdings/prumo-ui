import { ActionSpec } from './field-specs';
import * as React from "react";
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
export declare function EmptyState({ icon, iconName, title, description, action, actionSpec, size, className, }: EmptyStateProps): React.JSX.Element;

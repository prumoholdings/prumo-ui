import * as React from "react";
/**
 * SettingsPanel — a grouped settings/preferences form (CREATED; Phase 64 archetype
 * completion). Labelled SECTIONS, each a list of rows (label + helper description on
 * the left, a control flush-right), hairline dividers between rows. The Linear
 * gold-standard: persist-on-change (no Save bar by default). A `stacked` row puts a
 * wide control below the label. Tokens via var(--*); composes the elevated controls.
 */
export interface SettingsRow {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    /** The control (Switch/Input/Select/…), rendered flush-right (or below if stacked). */
    control: React.ReactNode;
    /** Put the control BELOW the label (for wide inputs/textareas). Default false. */
    stacked?: boolean;
}
export interface SettingsSection {
    id: string;
    title: string;
    description?: string;
    rows: SettingsRow[];
}
export interface SettingsPanelProps {
    sections: SettingsSection[];
    className?: string;
    "aria-label"?: string;
}
export declare function SettingsPanel({ sections, className, "aria-label": ariaLabel }: SettingsPanelProps): React.JSX.Element;

import * as React from "react";
/**
 * FormWizard — the ACTION composite (multi-step form). A generic FIELD SCHEMA
 * drives the inputs (text | number | textarea | select | checkbox | radio),
 * grouped into STEPS, with a progress indicator + next/back navigation and a
 * review-then-submit flow.
 *
 * a11y form semantics: a real <form>, each step a <fieldset>/<legend>, every
 * field a <label htmlFor>, required marked aria-required, errors wired via
 * aria-describedby + role=alert; the step list is an ordered progress indicator.
 * Step transition fade gated on prefers-reduced-motion. Archetype-generic
 * (no product-specific fields). Tokens via var(--*) only. Safe with zero steps.
 */
export type FieldType = "text" | "number" | "textarea" | "select" | "checkbox" | "radio";
export interface WizardField {
    /** Key in the values map. */
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    /** For select/radio. */
    options?: {
        label: string;
        value: string;
    }[];
    /** Optional helper text. */
    hint?: string;
}
export interface WizardStep {
    id: string;
    title: string;
    description?: string;
    fields: WizardField[];
}
export type WizardValues = Record<string, string | number | boolean | undefined>;
export interface FormWizardProps {
    steps: WizardStep[];
    /** Initial values keyed by field name. */
    initialValues?: WizardValues;
    /** Called with the full values map on final submit. */
    onSubmit?: (values: WizardValues) => void;
    /** Called on every change. */
    onChange?: (values: WizardValues) => void;
    className?: string;
    emptyState?: React.ReactNode;
}
export declare function FormWizard({ steps, initialValues, onSubmit, onChange, className, emptyState, }: FormWizardProps): React.JSX.Element;

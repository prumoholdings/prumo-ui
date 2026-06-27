import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  options?: { label: string; value: string }[];
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

function validateStep(step: WizardStep, values: WizardValues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of step.fields) {
    if (!f.required) continue;
    const v = values[f.name];
    const empty =
      v === undefined || v === "" || (f.type === "checkbox" && v !== true);
    if (empty) errors[f.name] = `${f.label} is required.`;
  }
  return errors;
}

export function FormWizard({
  steps,
  initialValues = {},
  onSubmit,
  onChange,
  className,
  emptyState,
}: FormWizardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stepIdx, setStepIdx] = React.useState(0);
  const [values, setValues] = React.useState<WizardValues>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  if (steps.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground",
          className,
        )}
      >
        {emptyState ?? "No steps configured."}
      </div>
    );
  }

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  const setValue = (name: string, value: WizardValues[string]) => {
    const nextVals = { ...values, [name]: value };
    setValues(nextVals);
    onChange?.(nextVals);
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const goNext = () => {
    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (isLast) {
      onSubmit?.(values);
    } else {
      setStepIdx((i) => i + 1);
    }
  };

  const goBack = () => setStepIdx((i) => Math.max(0, i - 1));

  return (
    <form
      className={cn("w-full", className)}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
    >
      {/* Progress indicator */}
      <ol className="mb-6 flex flex-wrap items-center gap-2" aria-label="Progress">
        {steps.map((s, i) => {
          const done = i < stepIdx;
          const current = i === stepIdx;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <span
                aria-current={current ? "step" : undefined}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border text-center font-medium",
                  done && "bg-primary text-primary-foreground border-transparent",
                  current && "border-primary text-primary",
                  !done && !current && "border-border text-muted-foreground",
                )}
                style={{ fontSize: "var(--text-small)" }}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:inline",
                  current ? "text-foreground" : "text-muted-foreground",
                )}
                style={{ fontSize: "var(--text-small)" }}
              >
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="mx-1 h-px w-6 bg-border" />
              )}
            </li>
          );
        })}
      </ol>

      <motion.fieldset
        key={step.id}
        className="m-0 border-0 p-0"
        initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0, 0, 0.38, 0.9] }}
      >
        <legend className="mb-1 font-semibold text-foreground" style={{ fontSize: "var(--text-h3)", fontFamily: "var(--font-display)" }}>
          {step.title}
        </legend>
        {step.description && (
          <p className="mb-4 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
            {step.description}
          </p>
        )}

        <div className="grid gap-4">
          {step.fields.map((f) => {
            const fieldId = `fw-${step.id}-${f.name}`;
            const errId = `${fieldId}-err`;
            const hintId = `${fieldId}-hint`;
            const err = errors[f.name];
            const describedBy = [f.hint ? hintId : null, err ? errId : null].filter(Boolean).join(" ") || undefined;
            return (
              <div key={f.name} className="grid gap-1.5">
                {f.type !== "checkbox" && (
                  <Label htmlFor={fieldId}>
                    {f.label}
                    {f.required && <span className="text-destructive"> *</span>}
                  </Label>
                )}

                {f.type === "text" || f.type === "number" ? (
                  <Input
                    id={fieldId}
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.required}
                    aria-required={f.required}
                    aria-invalid={!!err}
                    aria-describedby={describedBy}
                    value={(values[f.name] as string | number | undefined) ?? ""}
                    onChange={(e) =>
                      setValue(f.name, f.type === "number" ? e.target.valueAsNumber : e.target.value)
                    }
                  />
                ) : f.type === "textarea" ? (
                  <Textarea
                    id={fieldId}
                    placeholder={f.placeholder}
                    required={f.required}
                    aria-required={f.required}
                    aria-invalid={!!err}
                    aria-describedby={describedBy}
                    value={(values[f.name] as string | undefined) ?? ""}
                    onChange={(e) => setValue(f.name, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <Select
                    value={(values[f.name] as string | undefined) ?? ""}
                    onValueChange={(v) => setValue(f.name, v)}
                  >
                    <SelectTrigger id={fieldId} aria-required={f.required} aria-invalid={!!err} aria-describedby={describedBy}>
                      <SelectValue placeholder={f.placeholder ?? "Select…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(f.options ?? []).map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "radio" ? (
                  <RadioGroup
                    aria-label={f.label}
                    aria-required={f.required}
                    aria-describedby={describedBy}
                    value={(values[f.name] as string | undefined) ?? ""}
                    onValueChange={(v) => setValue(f.name, v)}
                  >
                    {(f.options ?? []).map((o) => {
                      const oid = `${fieldId}-${o.value}`;
                      return (
                        <div key={o.value} className="flex items-center gap-2">
                          <RadioGroupItem value={o.value} id={oid} />
                          <Label htmlFor={oid} className="font-normal">
                            {o.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                ) : (
                  // checkbox
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={fieldId}
                      aria-required={f.required}
                      aria-invalid={!!err}
                      aria-describedby={describedBy}
                      checked={values[f.name] === true}
                      onCheckedChange={(c) => setValue(f.name, c === true)}
                    />
                    <Label htmlFor={fieldId} className="font-normal">
                      {f.label}
                      {f.required && <span className="text-destructive"> *</span>}
                    </Label>
                  </div>
                )}

                {f.hint && (
                  <p id={hintId} className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                    {f.hint}
                  </p>
                )}
                {err && (
                  <p id={errId} role="alert" className="text-destructive" style={{ fontSize: "var(--text-small)" }}>
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </motion.fieldset>

      <div className="mt-6 flex items-center justify-between gap-2">
        <Button type="button" variant="outline" onClick={goBack} disabled={stepIdx === 0}>
          Back
        </Button>
        <Button type="submit">{isLast ? "Submit" : "Next"}</Button>
      </div>
    </form>
  );
}

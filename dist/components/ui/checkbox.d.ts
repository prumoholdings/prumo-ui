import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
/**
 * Checkbox — shadcn primitive over Radix. Checked via `--primary`, ring via
 * `--ring`, radius via `--radius-sm`. Box is 20px with a wrapping ≥44px hit
 * area recommended at call sites. No hardcoded color/radius.
 */
declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Checkbox };

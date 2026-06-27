import { VariantProps } from 'class-variance-authority';
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
/**
 * Toggle — shadcn primitive over Radix. On state via `--accent`, ring via
 * `--ring`, radius via `--radius-md`. ≥44px tap target on default size. No
 * hardcoded color/radius.
 */
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Toggle, toggleVariants };

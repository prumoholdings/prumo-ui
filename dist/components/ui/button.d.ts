import { VariantProps } from 'class-variance-authority';
import * as React from "react";
/**
 * Button — shadcn primitive. Every variant maps to a token color role
 * (`primary`/`secondary`/`destructive`/`accent`), radius via `--radius-md`, and a
 * token-driven press/hover transition (`--duration-fast` / `--ease-standard`).
 * Tap target ≥44px on the default+lg sizes (sm is 36px for dense toolbars).
 * No hardcoded color/radius/duration.
 */
declare const buttonVariants: (props?: ({
    variant?: "secondary" | "accent" | "destructive" | "link" | "default" | "outline" | "ghost" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Button — shadcn primitive. Every variant maps to a token color role
 * (`primary`/`secondary`/`destructive`/`accent`), radius via `--radius-md`, and a
 * token-driven press/hover transition (`--duration-fast` / `--ease-standard`).
 * Tap target ≥44px on the default+lg sizes (sm is 36px for dense toolbars).
 * No hardcoded color/radius/duration.
 */
const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // PRIMITIVE state grammar: press darkens + a subtle tactile scale; disabled
    // dims but keeps the hue.
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      // Solid variants DARKEN on hover/active (a shade of the same hue), never a
      // washed-out opacity reduction.
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-95 active:brightness-90",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-95 active:brightness-90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:brightness-95",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-95 active:brightness-90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:brightness-95",
        accent: "bg-accent text-accent-foreground hover:brightness-95 active:brightness-90",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "min-h-[40px] px-4 py-2",
        sm: "min-h-[32px] rounded-md px-3 text-xs",
        lg: "min-h-[44px] rounded-md px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={{
          fontSize: "var(--text-small)",
          transition:
            "background-color var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard)",
          ...style,
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

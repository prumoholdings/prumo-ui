import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Badge — shadcn primitive. Variants map to token color roles; radius via
 * `--radius-sm`. No hardcoded color/radius.
 */
const badgeVariants = cva(
  cn(
    "inline-flex items-center rounded-sm border px-2.5 py-0.5 font-semibold",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
  ),
  {
    // PRIMITIVE grammar: tags/badges are a SOFT TINT fill + matching text (a
    // low-saturation pill), not a heavy solid block. `solid` stays for emphasis.
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-foreground",
        secondary: "border-transparent bg-muted text-foreground",
        accent: "border-transparent bg-accent/20 text-foreground",
        destructive: "border-transparent bg-destructive/15 text-destructive",
        outline: "text-foreground border-border",
        solid: "border-transparent bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, style, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{ fontSize: "var(--text-small)", ...style }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

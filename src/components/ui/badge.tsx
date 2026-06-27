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
    "outline-none focus:ring-2 focus:ring-ring",
  ),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border-border",
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

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Toggle — shadcn primitive over Radix. On state via `--accent`, ring via
 * `--ring`, radius via `--radius-md`. ≥44px tap target on default size. No
 * hardcoded color/radius.
 */
const toggleVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium outline-none",
    "hover:bg-muted hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "min-h-[44px] min-w-[44px] px-3",
        sm: "min-h-[36px] min-w-[36px] px-2",
        lg: "min-h-[48px] min-w-[48px] px-5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, style, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    style={{
      fontSize: "var(--text-small)",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...style,
    }}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };

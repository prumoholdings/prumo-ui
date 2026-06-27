import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

/**
 * Progress — shadcn primitive over Radix. Track via `--secondary`, indicator via
 * `--primary`; token-driven fill transition gated by reduced-motion. Radix sets
 * role/aria-valuenow. No hardcoded color/duration.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, style, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    style={style}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        transition: "transform var(--duration-base) var(--ease-standard)",
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";

export { Progress };

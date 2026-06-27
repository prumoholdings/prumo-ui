import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

/**
 * Switch — shadcn primitive over Radix. Track via `--primary`/`--input`, thumb
 * via `--background`; token-driven thumb slide gated by reduced-motion. No
 * hardcoded color/duration.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, style, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    style={{ transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background ring-0",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
      style={{ boxShadow: "var(--shadow-sm)", transition: "transform var(--duration-fast) var(--ease-standard)" }}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };

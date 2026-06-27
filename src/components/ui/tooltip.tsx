import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

/**
 * Tooltip — shadcn primitive over Radix. Surface via `--popover`/`--border`/
 * `--radius-sm`/`--shadow-md`; token-driven fade gated by reduced-motion. No
 * hardcoded color/radius/shadow/duration.
 */
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-sm border border-border bg-popover px-3 py-1.5 text-popover-foreground",
        "data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0",
        className,
      )}
      style={{
        fontSize: "var(--text-small)",
        boxShadow: "var(--shadow-md)",
        transition: "opacity var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

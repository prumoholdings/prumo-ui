import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../../lib/utils";

/**
 * HoverCard — shadcn primitive over Radix. Surface via `--popover`/`--border`/
 * `--radius-md`/`--shadow-md`; token-driven fade gated by reduced-motion. No
 * hardcoded color/radius/shadow/duration.
 */
const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground outline-none",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        className,
      )}
      style={{
        boxShadow: "var(--shadow-md)",
        transition: "opacity var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };

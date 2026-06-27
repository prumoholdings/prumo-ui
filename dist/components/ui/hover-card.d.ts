import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
/**
 * HoverCard — shadcn primitive over Radix. Surface via `--popover`/`--border`/
 * `--radius-md`/`--shadow-md`; token-driven fade gated by reduced-motion. No
 * hardcoded color/radius/shadow/duration.
 */
declare const HoverCard: React.FC<HoverCardPrimitive.HoverCardProps>;
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { HoverCard, HoverCardTrigger, HoverCardContent };

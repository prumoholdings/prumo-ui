import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
/**
 * Tooltip — shadcn primitive over Radix. Surface via `--popover`/`--border`/
 * `--radius-sm`/`--shadow-md`; token-driven fade gated by reduced-motion. No
 * hardcoded color/radius/shadow/duration.
 */
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

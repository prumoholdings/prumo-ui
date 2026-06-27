import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
/**
 * Popover — shadcn primitive over Radix. Surface via `--popover`/`--border`/
 * `--radius-md`/`--shadow-md`; token-driven enter/exit transition gated by
 * reduced-motion. No hardcoded color/radius/shadow/duration.
 */
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

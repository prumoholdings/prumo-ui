import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
/**
 * Switch — shadcn primitive over Radix. Track via `--primary`/`--input`, thumb
 * via `--background`; token-driven thumb slide gated by reduced-motion. No
 * hardcoded color/duration.
 */
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Switch };

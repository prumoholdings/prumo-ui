import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
/**
 * Progress — shadcn primitive over Radix. Track via `--secondary`, indicator via
 * `--primary`; token-driven fill transition gated by reduced-motion. Radix sets
 * role/aria-valuenow. No hardcoded color/duration.
 */
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressPrimitive.ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Progress };

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
/**
 * RadioGroup — shadcn primitive over Radix. Item border via `--primary`, ring
 * via `--ring`. No hardcoded color.
 */
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { RadioGroup, RadioGroupItem };

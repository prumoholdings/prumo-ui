import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
/**
 * Label — shadcn primitive over Radix Label. `text-small` sizing via token. No
 * hardcoded color.
 */
declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export { Label };

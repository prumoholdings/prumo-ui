import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
/**
 * Slider — shadcn primitive over Radix. Track via `--secondary`/`--primary`,
 * thumb via `--background`/`--primary`, ring via `--ring`. No hardcoded color.
 */
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    /** Accessible label(s) for the thumb(s). A single string labels every thumb;
     * an array labels each thumb by index (e.g. ["Min", "Max"] for a range). The
     * Radix thumb carries role="slider", so the name must land there for a11y. */
    thumbLabels?: string | string[];
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export { Slider };

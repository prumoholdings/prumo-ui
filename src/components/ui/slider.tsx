import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

/**
 * Slider — shadcn primitive over Radix. Track via `--secondary`/`--primary`,
 * thumb via `--background`/`--primary`, ring via `--ring`. No hardcoded color.
 */
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Accessible label(s) for the thumb(s). A single string labels every thumb;
   * an array labels each thumb by index (e.g. ["Min", "Max"] for a range). The
   * Radix thumb carries role="slider", so the name must land there for a11y. */
  thumbLabels?: string | string[];
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, style, thumbLabels, "aria-label": ariaLabel, value, defaultValue, ...props }, ref) => {
    // Derive the number of thumbs from the controlled/uncontrolled value.
    const thumbCount = (value ?? defaultValue ?? [0]).length;
    const labelFor = (i: number): string | undefined => {
      if (Array.isArray(thumbLabels)) return thumbLabels[i];
      return thumbLabels ?? ariaLabel;
    };
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={labelFor(i)}
            className={cn(
              "block h-5 w-5 rounded-full border-2 border-primary bg-background outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            )}
            style={{ boxShadow: "var(--shadow-sm)", ...style }}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };

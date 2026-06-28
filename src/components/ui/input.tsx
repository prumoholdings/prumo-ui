import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Input — shadcn primitive. Border via `--input`, ring via `--ring`, radius via
 * `--radius-md`, ≥44px tap target. No hardcoded color/radius.
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, style, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2",
        "text-foreground placeholder:text-muted-foreground",
        // PRIMITIVE grammar: idle 1px border → colored border + ring on focus.
        "outline-none transition-colors hover:border-ring/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      style={{ fontSize: "var(--text-body)", ...style }}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };

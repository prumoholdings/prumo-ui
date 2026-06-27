import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Textarea — shadcn primitive. Themes via `--input`/`--ring`/`--radius-md`. No
 * hardcoded color/radius.
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, style, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2",
      "text-foreground placeholder:text-muted-foreground",
      "outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    style={{ fontSize: "var(--text-body)", ...style }}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };

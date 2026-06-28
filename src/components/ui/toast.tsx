import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Toast — shadcn primitive over Radix. A compact floating status card: leading
 * icon + title + optional description + optional action + close. Surface via
 * `--popover`/`--border`/`--radius-lg`/`--shadow-lg`; enter/exit + swipe motion via
 * the Radix data-state/data-swipe hooks + token transition, reduced-motion gated.
 * `destructive` uses `--destructive` (genuine status, not ranking). No hardcoded
 * color/radius/shadow/duration.
 */
const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[400px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  cn(
    "group pointer-events-auto relative flex w-full items-start gap-3 p-4 pr-9",
    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
  ),
  { variants: { variant: { default: "", destructive: "" } }, defaultVariants: { variant: "default" } },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, style, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    style={{
      borderRadius: "var(--radius-lg)",
      // srgb mix (NOT oklch) so destructive stays in the red family — an oklch arc
      // between red and a near-neutral border passes through purple.
      border: `1px solid ${variant === "destructive" ? "color-mix(in srgb, var(--destructive) 38%, var(--card))" : "var(--border)"}`,
      background: "var(--popover)",
      color: "var(--popover-foreground)",
      boxShadow: "var(--shadow-lg)",
      transition: "opacity var(--duration-base) var(--ease-entrance), transform var(--duration-base) var(--ease-entrance)",
      ...style,
    }}
    {...props}
  />
));
Toast.displayName = "Toast";

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, style, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-transparent px-3 font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
    style={{ fontSize: "var(--text-small)", ...style }}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" aria-hidden="true" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, style, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("font-semibold text-foreground", className)}
    style={{ fontSize: "var(--text-small)", ...style }}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, style, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-muted-foreground", className)}
    style={{ fontSize: "var(--text-small)", lineHeight: 1.45, ...style }}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

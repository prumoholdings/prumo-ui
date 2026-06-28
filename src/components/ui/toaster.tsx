import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

/**
 * Toaster — mount once at app root. Renders the live toast queue (from useToast)
 * into a bottom-right viewport: leading icon + title + description + action +
 * close. Trigger with `toast({ title, description, icon?, action?, variant? })`.
 */
export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, icon, ...props }) => (
        <Toast key={id} {...props}>
          {icon && (
            <span aria-hidden="true" className="mt-0.5 shrink-0 [&_svg]:h-5 [&_svg]:w-5">
              {icon}
            </span>
          )}
          <div className="grid flex-1 gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

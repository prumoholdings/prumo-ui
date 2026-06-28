import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";
import { Toaster } from "./toaster";
import { useToast } from "./use-toast";
import { Button } from "./button";

const meta: Meta = {
  title: "Primitives/Toast",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

/** Static variants (rendered in-place for review) — leading status icon + title +
 * description + action + close. `destructive` for genuine errors. */
export const Variants: Story = {
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-3" style={{ maxWidth: 400 }}>
        <Toast open style={{ position: "relative" }}>
          <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--primary)" }}>
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="grid flex-1 gap-1">
            <ToastTitle>Tour booked</ToastTitle>
            <ToastDescription>Wednesday 10:00am at Greenfields Primary.</ToastDescription>
          </div>
          <ToastAction altText="Undo">Undo</ToastAction>
          <ToastClose />
        </Toast>

        <Toast open style={{ position: "relative" }}>
          <span aria-hidden="true" className="mt-0.5 shrink-0 text-muted-foreground">
            <Info className="h-5 w-5" />
          </span>
          <div className="grid flex-1 gap-1">
            <ToastTitle>Saved to your shortlist</ToastTitle>
            <ToastDescription>You can compare shortlisted schools anytime.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="destructive" style={{ position: "relative" }}>
          <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--destructive)" }}>
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="grid flex-1 gap-1">
            <ToastTitle>Couldn't submit the form</ToastTitle>
            <ToastDescription>Check your connection and try again.</ToastDescription>
          </div>
          <ToastAction altText="Retry">Retry</ToastAction>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  ),
};

/** Live demo — trigger a toast via the hook (mount <Toaster/> once at app root). */
function LiveDemo() {
  const { toast } = useToast();
  return (
    <>
      <Button
        onClick={() =>
          toast({
            icon: <CheckCircle2 style={{ color: "var(--primary)" }} />,
            title: "Tour booked",
            description: "Wednesday 10:00am at Greenfields Primary.",
          })
        }
      >
        Book a tour
      </Button>
      <Toaster />
    </>
  );
}
export const Live: Story = { render: () => <LiveDemo /> };

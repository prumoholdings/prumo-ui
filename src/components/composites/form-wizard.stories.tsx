import type { Meta, StoryObj } from "@storybook/react";
import { FormWizard, type WizardStep } from "./form-wizard";

const steps: WizardStep[] = [
  {
    id: "account",
    title: "Account",
    description: "Tell us who you are.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, placeholder: "Ada Lovelace" },
      { name: "email", label: "Email", type: "text", required: true, placeholder: "you@example.com" },
    ],
  },
  {
    id: "prefs",
    title: "Preferences",
    description: "Configure your workspace.",
    fields: [
      {
        name: "plan",
        label: "Plan",
        type: "select",
        required: true,
        options: [
          { label: "Starter", value: "starter" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise" },
        ],
      },
      {
        name: "channel",
        label: "Preferred channel",
        type: "radio",
        options: [
          { label: "Email", value: "email" },
          { label: "Slack", value: "slack" },
        ],
      },
      { name: "bio", label: "About you", type: "textarea", placeholder: "A few words…", hint: "Optional" },
    ],
  },
  {
    id: "confirm",
    title: "Confirm",
    fields: [
      { name: "terms", label: "I accept the terms", type: "checkbox", required: true },
    ],
  },
];

const meta: Meta<typeof FormWizard> = {
  title: "Composites/FormWizard",
  component: FormWizard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof FormWizard>;

export const Default: Story = {
  args: { steps, onSubmit: (v) => console.log("submit", v) },
};

export const SingleStep: Story = {
  args: { steps: [steps[0]] },
};

export const Empty: Story = {
  args: { steps: [], emptyState: "No steps configured." },
};

export const WarmVsSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-stack)", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ ["--primary" as string]: "oklch(0.62 0.16 40)", ["--radius" as string]: "1rem", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Warm</h3>
        <FormWizard steps={steps} />
      </div>
      <div style={{ ["--primary" as string]: "oklch(0.5 0.16 264)", ["--radius" as string]: "0.125rem", padding: "1rem" }}>
        <h3 style={{ fontSize: "var(--text-h3)" }}>Sharp</h3>
        <FormWizard steps={steps} />
      </div>
    </div>
  ),
};

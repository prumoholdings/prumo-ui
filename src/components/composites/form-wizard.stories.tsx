import type { Meta, StoryObj } from "@storybook/react";
import { FormWizard, type WizardStep } from "./form-wizard";

/* A believable ACTION wizard — booking a school tour (coherent with the schools
 * domain across the catalog). Generic field schema; the component is archetype-
 * generic. */
const steps: WizardStep[] = [
  {
    id: "details",
    title: "Your details",
    description: "We'll use these to confirm your visit.",
    fields: [
      { name: "parent", label: "Your name", type: "text", required: true, placeholder: "e.g. Amara Okafor" },
      { name: "email", label: "Email", type: "text", required: true, placeholder: "you@example.com" },
      { name: "phone", label: "Phone", type: "text", placeholder: "Optional", hint: "In case we need to reach you on the day." },
    ],
  },
  {
    id: "visit",
    title: "Visit preferences",
    description: "Which school, and when suits you.",
    fields: [
      {
        name: "school",
        label: "School",
        type: "select",
        required: true,
        placeholder: "Choose a school",
        options: [
          { label: "Greenfields Primary", value: "greenfields" },
          { label: "St Mary's CE Primary", value: "stmarys" },
          { label: "Riverside Academy", value: "riverside" },
          { label: "Oakwood Primary", value: "oakwood" },
        ],
      },
      {
        name: "year",
        label: "Year group",
        type: "select",
        required: true,
        placeholder: "Select year group",
        options: [
          { label: "Reception", value: "reception" },
          { label: "Year 1", value: "y1" },
          { label: "Year 2", value: "y2" },
          { label: "Year 3", value: "y3" },
        ],
      },
      {
        name: "day",
        label: "Preferred day",
        type: "radio",
        required: true,
        options: [
          { label: "Weekday morning", value: "am" },
          { label: "Weekday afternoon", value: "pm" },
          { label: "Open day (Saturday)", value: "open" },
        ],
      },
      { name: "notes", label: "Anything to tell us?", type: "textarea", placeholder: "Accessibility needs, questions…", hint: "Optional" },
    ],
  },
  {
    id: "confirm",
    title: "Confirm",
    description: "Almost done.",
    fields: [
      { name: "consent", label: "I'm happy to be contacted about this visit", type: "checkbox", required: true },
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

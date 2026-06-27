import type { Meta, StoryObj } from "@storybook/react";
import { MotionShowcase } from "./MotionShowcase";

/**
 * `Tokens/Motion` — the standing review surface for the motion vocabulary
 * (`--duration-*` + `--ease-*`). Makes the otherwise invisible motion tokens
 * VISIBLE + feelable: travelling dots whose speed (durations) or curve (easings)
 * is driven ONLY by the token under test. Hit "Replay" to re-watch.
 */
const meta = {
  title: "Tokens/Motion",
  component: MotionShowcase,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    family: {
      control: "inline-radio",
      options: ["all", "durations", "easings"],
      description: "Which motion family to demonstrate.",
    },
  },
} satisfies Meta<typeof MotionShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Durations + easings together — the full motion contract surface. */
export const All: Story = {
  args: { family: "all" },
};

/** The duration scale only (instant/fast/base/slow), compared side by side. */
export const Durations: Story = {
  args: { family: "durations" },
};

/** The easing curves only (entrance/exit/standard), at a constant duration. */
export const Easings: Story = {
  args: { family: "easings" },
};

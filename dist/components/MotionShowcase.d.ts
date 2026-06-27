import * as React from "react";
export type MotionShowcaseFamily = "durations" | "easings" | "all";
export interface MotionShowcaseProps {
    /** Which motion family to demonstrate. */
    family?: MotionShowcaseFamily;
}
/**
 * MotionShowcase — makes the motion token vocabulary VISIBLE + feelable.
 *
 * Durations: one row per `--duration-*` token (instant/fast/base/slow), each a
 * dot that travels the SAME distance so the speeds compare side by side.
 * Easings: one row per `--ease-*` token (entrance/exit/standard), each travelling
 * the same distance over the same duration so the curve shapes are legible.
 *
 * A "Replay" button re-triggers every animation. `prefers-reduced-motion` is
 * respected (the dots jump straight to their end-state with no transition). All
 * values are read via `var(--*)`; nothing is hardcoded.
 */
export declare function MotionShowcase({ family }: MotionShowcaseProps): React.JSX.Element;
export default MotionShowcase;

/**
 * Framer-motion-consumable mirror of the CSS motion tokens
 * (`--duration-*` / `--ease-*`). Framer needs JS numbers (seconds) + cubic-bezier
 * TUPLES, not CSS `var()` strings — so JS-driven motion (framer) reads these
 * constants instead of scattering literal durations/eases across components
 * (NC-VOCAB-01 / craft-rubric C8 "token-driven"). CSS-driven motion keeps using
 * `var(--duration-*)`/`var(--ease-*)` directly.
 *
 * Keep in LOCKSTEP with `tokens.css` / `tokens.ts` MOTION_TOKENS. Durations are
 * seconds (CSS = ms); eases are the same cubic-bezier control points. The default
 * register = `standard` (identical to tokens.css defaults).
 */
export const DURATION = {
  /** --duration-instant: 100ms */
  instant: 0.1,
  /** --duration-fast: 200ms */
  fast: 0.2,
  /** --duration-base: 300ms */
  base: 0.3,
  /** --duration-slow: 500ms */
  slow: 0.5,
} as const;

/** A cubic-bezier control-point tuple (framer-consumable; mutable for its types). */
export type Bezier = [number, number, number, number];

export const EASE: Record<"entrance" | "exit" | "standard", Bezier> = {
  /** --ease-entrance: cubic-bezier(0, 0, 0.38, 0.9) */
  entrance: [0, 0, 0.38, 0.9],
  /** --ease-exit: cubic-bezier(0.2, 0, 1, 0.9) */
  exit: [0.2, 0, 1, 0.9],
  /** --ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9) */
  standard: [0.2, 0, 0.38, 0.9],
};

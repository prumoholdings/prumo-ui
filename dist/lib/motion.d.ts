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
export declare const DURATION: {
    /** --duration-instant: 100ms */
    readonly instant: 0.1;
    /** --duration-fast: 200ms */
    readonly fast: 0.2;
    /** --duration-base: 300ms */
    readonly base: 0.3;
    /** --duration-slow: 500ms */
    readonly slow: 0.5;
};
/** A cubic-bezier control-point tuple (framer-consumable; mutable for its types). */
export type Bezier = [number, number, number, number];
export declare const EASE: Record<"entrance" | "exit" | "standard", Bezier>;

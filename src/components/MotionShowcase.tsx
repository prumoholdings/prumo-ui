import * as React from "react";
import { tokenVar, type TokenName } from "../tokens";

/** The four duration tokens, in monotonic order, with their default values. */
const DURATIONS: ReadonlyArray<{ token: TokenName; value: string }> = [
  { token: "duration-instant", value: "100ms" },
  { token: "duration-fast", value: "200ms" },
  { token: "duration-base", value: "300ms" },
  { token: "duration-slow", value: "500ms" },
] as const;

/** The three register-keyed easing curves, with their default `cubic-bezier`. */
const EASINGS: ReadonlyArray<{ token: TokenName; value: string; feel: string }> = [
  {
    token: "ease-entrance",
    value: "cubic-bezier(0, 0, 0.38, 0.9)",
    feel: "settles in (decelerates)",
  },
  {
    token: "ease-exit",
    value: "cubic-bezier(0.2, 0, 1, 0.9)",
    feel: "accelerates away",
  },
  {
    token: "ease-standard",
    value: "cubic-bezier(0.2, 0, 0.38, 0.9)",
    feel: "neutral",
  },
] as const;

/** Distance the demo element travels when triggered (token-driven layout). */
const TRAVEL = "16rem";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

interface MotionRowProps {
  /** Bare contract token name (without `--`). */
  token: TokenName;
  /** The resolved default value, labelled for the reviewer. */
  value: string;
  /** Whether the demo element is in its "moved" (triggered) state. */
  active: boolean;
  /** Honour `prefers-reduced-motion`: no transition, jump to end-state. */
  reduced: boolean;
  /** Which CSS property the token drives. */
  kind: "duration" | "easing";
  /** Optional one-line description of the curve's feel. */
  feel?: string;
}

/**
 * One labelled row: a track with a dot that travels `TRAVEL` when `active`.
 * For a DURATION row the transition-duration is `var(--<token>)` (easing held
 * constant at `--ease-standard`); for an EASING row the timing-function is
 * `var(--<token>)` (duration held constant at `--duration-slow`, so the curve
 * is legible). Tokens are read ONLY via `var(--*)` (the iron discipline).
 */
function MotionRow({ token, value, active, reduced, kind, feel }: MotionRowProps) {
  const duration =
    kind === "duration" ? tokenVar(token) : tokenVar("duration-slow");
  const easing = kind === "easing" ? tokenVar(token) : tokenVar("ease-standard");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-gutter)",
        padding: "0.5rem 0",
      }}
    >
      <div style={{ minWidth: "13rem" }}>
        <code style={{ fontSize: "var(--text-small)" }}>{`--${token}`}</code>
        <div
          style={{
            fontSize: "var(--text-small)",
            color: "var(--muted-foreground)",
          }}
        >
          {value}
          {feel ? ` · ${feel}` : null}
        </div>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          flex: 1,
          height: "1.5rem",
          borderRadius: "var(--radius-sm)",
          background: "var(--muted)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "1.5rem",
            height: "1.5rem",
            marginTop: "-0.75rem",
            borderRadius: "var(--radius)",
            background: "var(--primary)",
            transform: `translateX(${active ? TRAVEL : "0"})`,
            opacity: active ? 1 : 0.4,
            transition: reduced
              ? "none"
              : `transform ${duration} ${easing}, opacity ${duration} ${easing}`,
          }}
        />
      </div>
    </div>
  );
}

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
export function MotionShowcase({ family = "all" }: MotionShowcaseProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(false);

  // Auto-play once on mount so the surface is alive at first glance.
  React.useEffect(() => {
    const id = window.setTimeout(() => setActive(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  const replay = React.useCallback(() => {
    setActive(false);
    // Reflow to a fresh frame so the transition re-runs from the origin.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActive(true));
    });
  }, []);

  const showDurations = family === "durations" || family === "all";
  const showEasings = family === "easings" || family === "all";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-stack)",
        maxWidth: "var(--container-max)",
        color: "var(--foreground)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-gutter)" }}>
        <button
          type="button"
          onClick={replay}
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            padding: "0.375rem 1rem",
            fontSize: "var(--text-small)",
            cursor: "pointer",
            transition: reduced
              ? "none"
              : "transform var(--duration-fast) var(--ease-standard)",
          }}
        >
          Replay
        </button>
        {reduced ? (
          <span style={{ fontSize: "var(--text-small)", color: "var(--muted-foreground)" }}>
            prefers-reduced-motion is on — animations are disabled; dots jump to
            their end state.
          </span>
        ) : null}
      </div>

      {showDurations ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h3 style={{ fontSize: "var(--text-h3)", margin: 0 }}>Durations</h3>
          <p style={{ fontSize: "var(--text-small)", color: "var(--muted-foreground)", margin: 0 }}>
            Same distance + easing (<code>--ease-standard</code>); only the
            <code> transition-duration</code> changes. Faster tokens arrive first.
          </p>
          {DURATIONS.map((d) => (
            <MotionRow
              key={d.token}
              token={d.token}
              value={d.value}
              active={active}
              reduced={reduced}
              kind="duration"
            />
          ))}
        </section>
      ) : null}

      {showEasings ? (
        <section style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <h3 style={{ fontSize: "var(--text-h3)", margin: 0 }}>Easings</h3>
          <p style={{ fontSize: "var(--text-small)", color: "var(--muted-foreground)", margin: 0 }}>
            Same distance + duration (<code>--duration-slow</code>); only the
            <code> transition-timing-function</code> changes, so the curve shape
            is visible.
          </p>
          {EASINGS.map((e) => (
            <MotionRow
              key={e.token}
              token={e.token}
              value={e.value}
              feel={e.feel}
              active={active}
              reduced={reduced}
              kind="easing"
            />
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default MotionShowcase;

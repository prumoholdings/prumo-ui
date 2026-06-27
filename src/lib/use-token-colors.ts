import * as React from "react";

/**
 * useTokenColors — resolve a list of contract color tokens (e.g. "primary",
 * "accent") to concrete CSS color strings by reading the computed `var(--<token>)`
 * off a host element. This lets charting libs that need explicit color values
 * (Tremor/recharts) be driven by the SAME token contract everything else reads —
 * so a per-concept `:root` retunes the charts too. No hardcoded color anywhere;
 * the values come straight from the resolved tokens.
 *
 * Returns a ref to attach to the chart's container and the resolved colors. Falls
 * back to the raw `var(--token)` string until the element mounts (SSR / first
 * paint), which is harmless for Tremor.
 */
export function useTokenColors(
  tokens: string[],
): [React.RefObject<HTMLDivElement>, string[]] {
  const ref = React.useRef<HTMLDivElement>(null);
  const [colors, setColors] = React.useState<string[]>(() =>
    tokens.map((t) => `var(--${t})`),
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const styles = getComputedStyle(el);
    const resolved = tokens.map((t) => {
      const v = styles.getPropertyValue(`--${t}`).trim();
      return v || `var(--${t})`;
    });
    setColors(resolved);
    // Re-resolve when the tokens list identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens.join(",")]);

  return [ref, colors];
}

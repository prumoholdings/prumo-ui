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
export declare function useTokenColors(tokens: string[]): [React.RefObject<HTMLDivElement>, string[]];

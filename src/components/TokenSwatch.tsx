import * as React from "react";
import { cn } from "../lib/utils";
import { TOKEN_FAMILIES, type TokenName } from "../tokens";

export interface TokenSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The contract color token to display (read via `var(--<token>)`). */
  token: TokenName;
  /** Optional human label; defaults to the token name. */
  label?: string;
}

/**
 * TokenSwatch — the Stage-1 SMOKE component. It reads a color token from the
 * canonical contract (`var(--<token>)`) and renders a labelled chip, using the
 * finish tokens (`--radius`, `--shadow-sm`, `--border`) and a token-driven hover
 * transition (`--duration-fast`, `--ease-standard`). It proves a component can be
 * skinned entirely through the token contract with NO hardcoded color/radius/
 * shadow/motion — exactly the discipline the real components follow.
 */
export const TokenSwatch = React.forwardRef<HTMLDivElement, TokenSwatchProps>(
  ({ token, label, className, style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-3 p-2", className)}
        style={{
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--card-foreground)",
          transition: "transform var(--duration-fast) var(--ease-standard)",
          ...style,
        }}
        {...rest}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: `var(--${token})`,
          }}
        />
        <span style={{ fontSize: "var(--text-small)" }}>
          {label ?? token}
        </span>
      </div>
    );
  },
);
TokenSwatch.displayName = "TokenSwatch";

export interface TokenPaletteProps {
  /** Which family to show; defaults to the color roles. */
  family?: keyof typeof TOKEN_FAMILIES;
}

/** A grid of swatches for a token family — the Storybook contract surface. */
export function TokenPalette({ family = "color" }: TokenPaletteProps) {
  const tokens = TOKEN_FAMILIES[family] as readonly TokenName[];
  return (
    <div
      className="container"
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--density-gap)" }}
    >
      {tokens.map((t) => (
        <TokenSwatch key={t} token={t} />
      ))}
    </div>
  );
}

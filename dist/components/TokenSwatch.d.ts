import { TOKEN_FAMILIES, TokenName } from '../tokens';
import * as React from "react";
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
export declare const TokenSwatch: React.ForwardRefExoticComponent<TokenSwatchProps & React.RefAttributes<HTMLDivElement>>;
export interface TokenPaletteProps {
    /** Which family to show; defaults to the color roles. */
    family?: keyof typeof TOKEN_FAMILIES;
}
/** A grid of swatches for a token family — the Storybook contract surface. */
export declare function TokenPalette({ family }: TokenPaletteProps): React.JSX.Element;

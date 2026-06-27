/**
 * @prumo/ui — public entry point.
 *
 * Stage 1 (scaffold) exports: the canonical token contract + the smoke
 * component. The full shadcn primitive palette + the high-level composites
 * (DataTable/ComparisonTable/CardCollection/StatDashboard/Board/FormWizard)
 * land in Stage 2.
 *
 * Consumers MUST also import the token contract CSS once at app root:
 *   import "@prumo/ui/tokens.css";
 */
import "./tokens.css";

export * from "./tokens";
export { cn } from "./lib/utils";
export { useTokenColors } from "./lib/use-token-colors";
export { TokenSwatch, TokenPalette } from "./components/TokenSwatch";
export type { TokenSwatchProps, TokenPaletteProps } from "./components/TokenSwatch";

// The full shadcn primitive palette (token-reading).
export * from "./components/ui";

// The high-level composites (archetype-mapped).
export * from "./components/composites";

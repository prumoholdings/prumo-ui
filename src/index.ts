/**
 * @prumo/ui — public entry point.
 *
 * Exports the complete design system (Stage 2):
 *   - the canonical token contract (names + typed view + tokenVar + helpers);
 *   - the full shadcn primitive palette (token-reading);
 *   - the high-level COMPOSITES mapped to the SaaS frontend archetypes
 *     (DataTable / ComparisonTable / CardCollection / StatDashboard / Board /
 *     FormWizard) + useTokenColors for chart theming.
 *
 * Every component reads the token contract ONLY via `var(--*)` — a per-concept
 * `:root` skins the whole catalog. See CATALOG.md for the component-by-archetype
 * index the companycouncil screen-author composes from.
 *
 * Consumers MUST also import the token contract CSS once at app root:
 *   import "@prumo/ui/tokens.css";
 */
import "./tokens.css";

export * from "./tokens";
export { cn } from "./lib/utils";
export { useTokenColors } from "./lib/use-token-colors";
// JS-side mirror of the CSS motion tokens, for framer-motion-driven animation.
export { DURATION, EASE } from "./lib/motion";
export type { Bezier } from "./lib/motion";
export { TokenSwatch, TokenPalette } from "./components/TokenSwatch";
export type { TokenSwatchProps, TokenPaletteProps } from "./components/TokenSwatch";

// The full shadcn primitive palette (token-reading).
export * from "./components/ui";

// The high-level composites (archetype-mapped).
export * from "./components/composites";

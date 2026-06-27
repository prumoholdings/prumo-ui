/**
 * prumo-ui — THE CANONICAL TOKEN CONTRACT (typed), NC-VOCAB-01.
 *
 * The TypeScript view of the CSS-custom-property vocabulary defined in
 * `tokens.css`. This is the contract both halves of the token seam conform to:
 *   - prumo-ui components READ these var names (via `tokenVar(...)`);
 *   - companycouncil's render emitter (`generate_styled_code._design_tokens_css`)
 *     PRODUCES these exact names into the product's `:root`.
 *
 * Drift between this list and the emitter = a silent dead component (the
 * `----duration-base` bug). Keep this in lockstep with `tokens.css` and the
 * companycouncil emitters.
 */

/** A bare CSS custom-property name (without the leading `--`). */
export type TokenName = (typeof TOKEN_NAMES)[number];

/** Color roles — the 17 shadcn semantic roles (+ popover pair). */
export const COLOR_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "popover",
  "popover-foreground",
] as const;

/** Fluid responsive type scale. */
export const TYPE_TOKENS = [
  "text-display",
  "text-h1",
  "text-h2",
  "text-h3",
  "text-body",
  "text-small",
] as const;

/** Container + spacing rhythm. */
export const SPACING_TOKENS = [
  "container-max",
  "container-gutter",
  "space-section",
  "space-stack",
  "space-gutter",
] as const;

/** Finish — shape / radius (base + calc scale). */
export const RADIUS_TOKENS = [
  "radius",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
] as const;

/** Finish — elevation / shadow (web platform class). */
export const SHADOW_TOKENS = [
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
] as const;

/** Finish — density (component-level gap + padding). */
export const DENSITY_TOKENS = ["density-gap", "density-padding"] as const;

/** Finish — surface (frosted web + iOS material). */
export const SURFACE_TOKENS = [
  "surface-backdrop-blur",
  "surface-bg-opacity",
  "surface-material",
  "surface-material-blur",
  "surface-material-opacity",
] as const;

/** Motion — duration scale + register-keyed easing curves. */
export const MOTION_TOKENS = [
  "duration-instant",
  "duration-fast",
  "duration-base",
  "duration-slow",
  "ease-entrance",
  "ease-exit",
  "ease-standard",
] as const;

/** Typography families (display + body). */
export const FONT_TOKENS = ["font-display", "font-body"] as const;

/** The complete vocabulary, grouped by family (the contract surface). */
export const TOKEN_FAMILIES = {
  color: COLOR_TOKENS,
  type: TYPE_TOKENS,
  spacing: SPACING_TOKENS,
  radius: RADIUS_TOKENS,
  shadow: SHADOW_TOKENS,
  density: DENSITY_TOKENS,
  surface: SURFACE_TOKENS,
  motion: MOTION_TOKENS,
  font: FONT_TOKENS,
} as const;

/** The flat list of every token name in the contract. */
export const TOKEN_NAMES = [
  ...COLOR_TOKENS,
  ...TYPE_TOKENS,
  ...SPACING_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...DENSITY_TOKENS,
  ...SURFACE_TOKENS,
  ...MOTION_TOKENS,
  ...FONT_TOKENS,
] as const;

/**
 * Build a `var(--<name>)` reference for a contract token — the ONLY sanctioned
 * way a component reads a token, so reads are typo-checked against the vocabulary.
 *
 *   tokenVar("primary")        // => "var(--primary)"
 *   tokenVar("radius", "8px")  // => "var(--radius, 8px)"
 */
export function tokenVar(name: TokenName, fallback?: string): string {
  return fallback === undefined ? `var(--${name})` : `var(--${name}, ${fallback})`;
}

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
export declare const COLOR_TOKENS: readonly ["background", "foreground", "card", "card-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "popover", "popover-foreground"];
/** Fluid responsive type scale. */
export declare const TYPE_TOKENS: readonly ["text-display", "text-h1", "text-h2", "text-h3", "text-body", "text-small"];
/** Container + spacing rhythm. */
export declare const SPACING_TOKENS: readonly ["container-max", "container-gutter", "space-section", "space-stack", "space-gutter"];
/** Finish — shape / radius (base + calc scale). */
export declare const RADIUS_TOKENS: readonly ["radius", "radius-sm", "radius-md", "radius-lg", "radius-xl"];
/** Finish — elevation / shadow (web platform class). */
export declare const SHADOW_TOKENS: readonly ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
/** Finish — density (component-level gap + padding). */
export declare const DENSITY_TOKENS: readonly ["density-gap", "density-padding"];
/** Finish — surface (frosted web + iOS material). */
export declare const SURFACE_TOKENS: readonly ["surface-backdrop-blur", "surface-bg-opacity", "surface-material", "surface-material-blur", "surface-material-opacity"];
/** Motion — duration scale + register-keyed easing curves. */
export declare const MOTION_TOKENS: readonly ["duration-instant", "duration-fast", "duration-base", "duration-slow", "ease-entrance", "ease-exit", "ease-standard"];
/** Typography families (display + body). */
export declare const FONT_TOKENS: readonly ["font-display", "font-body"];
/** The complete vocabulary, grouped by family (the contract surface). */
export declare const TOKEN_FAMILIES: {
    readonly color: readonly ["background", "foreground", "card", "card-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "popover", "popover-foreground"];
    readonly type: readonly ["text-display", "text-h1", "text-h2", "text-h3", "text-body", "text-small"];
    readonly spacing: readonly ["container-max", "container-gutter", "space-section", "space-stack", "space-gutter"];
    readonly radius: readonly ["radius", "radius-sm", "radius-md", "radius-lg", "radius-xl"];
    readonly shadow: readonly ["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
    readonly density: readonly ["density-gap", "density-padding"];
    readonly surface: readonly ["surface-backdrop-blur", "surface-bg-opacity", "surface-material", "surface-material-blur", "surface-material-opacity"];
    readonly motion: readonly ["duration-instant", "duration-fast", "duration-base", "duration-slow", "ease-entrance", "ease-exit", "ease-standard"];
    readonly font: readonly ["font-display", "font-body"];
};
/** The flat list of every token name in the contract. */
export declare const TOKEN_NAMES: readonly ["background", "foreground", "card", "card-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "popover", "popover-foreground", "text-display", "text-h1", "text-h2", "text-h3", "text-body", "text-small", "container-max", "container-gutter", "space-section", "space-stack", "space-gutter", "radius", "radius-sm", "radius-md", "radius-lg", "radius-xl", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "density-gap", "density-padding", "surface-backdrop-blur", "surface-bg-opacity", "surface-material", "surface-material-blur", "surface-material-opacity", "duration-instant", "duration-fast", "duration-base", "duration-slow", "ease-entrance", "ease-exit", "ease-standard", "font-display", "font-body"];
/**
 * Build a `var(--<name>)` reference for a contract token — the ONLY sanctioned
 * way a component reads a token, so reads are typo-checked against the vocabulary.
 *
 *   tokenVar("primary")        // => "var(--primary)"
 *   tokenVar("radius", "8px")  // => "var(--radius, 8px)"
 */
export declare function tokenVar(name: TokenName, fallback?: string): string;

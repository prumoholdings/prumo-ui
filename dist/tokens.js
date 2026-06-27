const o = [
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
  "popover-foreground"
], a = [
  "text-display",
  "text-h1",
  "text-h2",
  "text-h3",
  "text-body",
  "text-small"
], e = [
  "container-max",
  "container-gutter",
  "space-section",
  "space-stack",
  "space-gutter"
], s = [
  "radius",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl"
], n = [
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl"
], d = ["density-gap", "density-padding"], c = [
  "surface-backdrop-blur",
  "surface-bg-opacity",
  "surface-material",
  "surface-material-blur",
  "surface-material-opacity"
], i = [
  "duration-instant",
  "duration-fast",
  "duration-base",
  "duration-slow",
  "ease-entrance",
  "ease-exit",
  "ease-standard"
], u = ["font-display", "font-body"], p = {
  color: o,
  type: a,
  spacing: e,
  radius: s,
  shadow: n,
  density: d,
  surface: c,
  motion: i,
  font: u
}, f = [
  ...o,
  ...a,
  ...e,
  ...s,
  ...n,
  ...d,
  ...c,
  ...i,
  ...u
];
function g(r, t) {
  return t === void 0 ? `var(--${r})` : `var(--${r}, ${t})`;
}
export {
  o as COLOR_TOKENS,
  d as DENSITY_TOKENS,
  u as FONT_TOKENS,
  i as MOTION_TOKENS,
  s as RADIUS_TOKENS,
  n as SHADOW_TOKENS,
  e as SPACING_TOKENS,
  c as SURFACE_TOKENS,
  p as TOKEN_FAMILIES,
  f as TOKEN_NAMES,
  a as TYPE_TOKENS,
  g as tokenVar
};
//# sourceMappingURL=tokens.js.map

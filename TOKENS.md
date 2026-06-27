# The canonical token contract (NC-VOCAB-01)

`prumo-ui` owns the **vocabulary** of CSS custom properties — the var *names* +
the scale structure + safe *defaults*. companycouncil's render owns the
per-concept **values**. Both sides MUST conform to the exact same names. Drift =
a silent dead component (the `----duration-base` dangling-var bug).

- prumo-ui READS these names (`tokens.css` defaults so components work standalone
  in Storybook; `tokens.ts` is the typed contract; `tokenVar()` is the only
  sanctioned read).
- companycouncil's build EMITS these names into the product's `:root`, overriding
  the defaults (a later `:root` wins the cascade → the per-concept skin).

## The seam (where each name is produced)

| Family | Producer (companycouncil, read-only) |
| --- | --- |
| color roles | `agents/ui_design/nodes/derive_tokens.py::_author_oklch_palette` → `agents/pipeline/render/generate_styled_code.py::_design_tokens_css` (`--<role>`) |
| type scale | `derive_tokens._responsive_tokens.type_scale` → `_design_tokens_css` (`--text-<k>`) |
| container/spacing | `derive_tokens._responsive_tokens.container/spacing` → `_design_tokens_css` (`--container-*`, `--space-<k>`) |
| radius | `derive_tokens.emit_finish_tokens` (radius) → `--radius`, `--radius-sm/md/lg/xl` |
| shadow | `derive_tokens.emit_finish_tokens` (elevation, web) → `--shadow-sm/md/lg/xl` |
| density | `derive_tokens.emit_finish_tokens` (density) → `--density-gap`, `--density-padding` |
| surface | `derive_tokens.emit_finish_tokens` (surface, frosted/iOS) → `--surface-*` |
| motion | `derive_tokens.emit_motion_tokens` / `_DEFAULT_MOTION_CSS_VARS` → `--duration-*`, `--ease-*` |
| fonts | `_design_tokens_css` font-family rules (Fraunces/Figtree) → `--font-display`, `--font-body` |

## The complete vocabulary

### Color roles (19 — the 17 shadcn roles + the popover pair)
`--background` `--foreground` `--card` `--card-foreground` `--primary`
`--primary-foreground` `--secondary` `--secondary-foreground` `--muted`
`--muted-foreground` `--accent` `--accent-foreground` `--destructive`
`--destructive-foreground` `--border` `--input` `--ring` `--popover`
`--popover-foreground`

> Note: the emitter authors the **17** shadcn roles. `--popover` /
> `--popover-foreground` are part of the shadcn primitive vocabulary (Popover,
> DropdownMenu, Select read them) but the current companycouncil emitter does NOT
> author them; prumo-ui defaults them to the card surface so those primitives
> resolve standalone. **NC-VOCAB-01 lock candidate:** either add `popover` to
> `derive_tokens` OR keep the prumo-ui default — flagged so the seam is explicit.

### Responsive type scale (6)
`--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-body` `--text-small`

### Container + spacing rhythm (5)
`--container-max` `--container-gutter` `--space-section` `--space-stack`
`--space-gutter`

### Finish — radius (5)
`--radius` `--radius-sm` `--radius-md` `--radius-lg` `--radius-xl`
(`--radius-lg == var(--radius)`; the scale is a `calc()` off the base.)

### Finish — shadow (4)
`--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-xl`
(web/android platform class; a `flat` finish emits `none`.)

### Finish — density (2)
`--density-gap` `--density-padding`

### Finish — surface (5)
`--surface-backdrop-blur` `--surface-bg-opacity` (frosted web) ·
`--surface-material` `--surface-material-blur` `--surface-material-opacity` (iOS)
(emitted only for the matching finish; defaulted here for standalone resolvability.)

### Motion (7)
`--duration-instant` `--duration-fast` `--duration-base` `--duration-slow`
`--ease-entrance` `--ease-exit` `--ease-standard`
(durations 100–500ms, monotonic; >500ms forbidden. Defaults = the `standard`
register, identical to `_DEFAULT_MOTION_CSS_VARS`.)

### Fonts (2)
`--font-display` (Fraunces Variable) · `--font-body` (Figtree Variable)

## Rule

Any component that needs a value reaches for a token via `tokenVar(name)` — never
a hardcoded color/radius/shadow/spacing/duration. Adding a token = add it here +
in `tokens.css` (default) + in `tokens.ts` (typed) AND ensure the companycouncil
emitter produces the same name.

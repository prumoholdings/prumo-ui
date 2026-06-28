# @prumo/ui — component catalog

The durable, versioned component layer the companycouncil screen-author COMPOSES
from (instead of re-authoring dense UI per screen). Every component:

- reads the **canonical token contract ONLY via `var(--*)`** (the 55-var
  vocabulary in `tokens.css` / `tokens.ts`) — zero hardcoded
  color/radius/shadow/spacing/duration, so a per-concept `:root` re-skins the
  whole catalog (warm-vs-sharp, same components);
- has **ONE responsive layout** via CSS reflow (never a `hidden md:block`
  desktop tree + a `md:hidden` mobile tree rendering the same data twice);
- is **a11y by construction** (semantic roles/labels, ≥44px tap targets on
  triggers, keyboard nav) and **respects `prefers-reduced-motion`**;
- ships **built-in motion** valued by the motion tokens
  (`var(--duration-*)`/`var(--ease-*)`), gated on reduced-motion;
- is **archetype-generic** (no product-specific fields) with typed props + a
  safe `emptyState`/default.

Import the token CSS once at app root: `import "@prumo/ui/tokens.css";`

## The SaaS frontend archetypes

| Code | Archetype | What it serves |
| --- | --- | --- |
| **RECORD** | structured data over rows/records | tables, lists, detail views |
| **ENGAGEMENT** | browse / feed / discover | catalogs, galleries, search results, feeds |
| **INTELLIGENCE** | compare / analyze / decide | comparators, dashboards, KPI + charts |
| **ACTION** | do work / move things forward | boards, pipelines, multi-step forms |

---

## Composites (compose these first)

| Component | Archetype | Purpose | Responsive strategy | Motion |
| --- | --- | --- | --- | --- |
| `DataTable` | RECORD · INTELLIGENCE | Generic grid (TanStack): sortable columns (`meta.align` right-aligns numerics), global filter, pagination, search + live-count toolbar + actions slot; optional **row selection** (`enableRowSelection` — checkbox column w/ indeterminate select-all) + a **bulk-action bar** (`bulkActions`) | efficient dense grid, **sticky header**, hairline rows (no zebra), selected-row tint; mobile = per-**record** cards (title + labelled rows, single DOM) | feedback-only (hover/sort transitions); NO entrance choreography (C8 — a grid shouldn't stagger every page) |
| `ComparisonTable` | INTELLIGENCE | Anti-ranking comparator: N entities × M attributes; cell formats `text \| badge \| score \| percent \| check \| count \| currency`; optional category groups, Key/All + density toggles, editorial header + sourced legend | true matrix, **frozen label column** + **sticky header**; mobile = frozen anchor + **horizontal-scroll** of entity columns + edge-fade + swipe (single DOM, no card-restack) | row-stagger on mount |
| `CardCollection` | ENGAGEMENT | Feed / listing / search-results / gallery / catalog; `renderItem` template + `layout` (`grid \| list \| masonry`) | auto-fill grid / stacked / CSS columns — all pure CSS reflow | item-stagger on mount |
| `StatDashboard` | INTELLIGENCE | KPI stat-card grid (label / big number / **neutral** factual delta / on-brand smooth **sparkline**) + chart (Tremor area/bar/line + a custom token **donut** + a custom token **funnel** — neutral stage drop-off, value+conversion%) | responsive KPI grid (1→N cols); smooth `monotone` curves; charts **painted from brand tokens** (Tremor can't take oklch) | subtle KPI reveal-stagger; smooth curves + gradient fades; anti-ranking neutral delta |
| `Board` | ACTION | Kanban / pipeline; **flat** columns (title + muted count + optional ＋), generic `renderCard`, keyboard move buttons (≥44px, a11y) | horizontal columns desktop (right **edge-fade** on scroll) → **vertical stack** mobile (single DOM) | **first-mount-only** card-stagger (never replays on move) |
| `FormWizard` | ACTION | Multi-step form (card panel); generic field schema (`text \| number \| textarea \| select \| checkbox \| radio`), numbered **stepper** (progress-filled) + "Step X of Y" eyebrow, validate→next/back, a11y (fieldset/legend, role=alert) | comfortable measure (`max-w-2xl`); progress reflows; single DOM | per-step **continuity** fade (tokenized) |
| `PageHeader` | all (layout) | The screen header (Phase 64 CREATED): breadcrumb/eyebrow + editorial display **title** + description + a **sourced meta strip** (provenance wedge) + **actions-right**; optional tab row (children) + hairline divider | title-left + actions-right; actions wrap below the title on mobile (single DOM); `<header>` landmark, prop-controlled heading level | static |
| `FilterBar` | RECORD · ENGAGEMENT | The discover toolbar (Phase 64 CREATED): search + a filter-control/adder slot + removable **active-filter chips** (`{id,label,name,onRemove}[]`) + Clear-all + result count + a NEUTRAL sort (distance/name, never a quality rank — anti-ranking) | single flex-wrap toolbar; filters/chips wrap on mobile (single DOM); `role=search`, `aria-live` count, remove-chip aria-labels | static |
| `DetailView` | RECORD · INTELLIGENCE | The decide page (Phase 64 CREATED): `header` (PageHeader) + `media` hero + grouped **sourced** label·value fact `sections` (semantic `<dl>`, hairline dividers) + sticky actions/summary **aside** + a provenance footer. NO aggregate score/grade/verdict (anti-ranking) | main + sticky aside (stacks on mobile, single DOM) | static |
| `EmptyState` | all | The no-items placeholder (Phase 64 CREATED): centered muted icon chip + title + one-line description + optional CTA(s); `size` sm/default. Promotes the inline composite empty-pattern into one reusable primitive; never a blank/skeleton | centered stack | static · `role=status` |
| `Timeline` | ACTION · ENGAGEMENT | A vertical activity/history feed (Phase 64 CREATED): a 1px rail + per-entry icon/dot node + title + `<time>` + description. Neutral nodes (status color reserved for genuine status) | semantic `<ol>/<li>` | static |
| `FileUpload` | ACTION | A drag-and-drop upload (Phase 64 CREATED): dashed dropzone (real `<button>` + drag-active `--ring`) + hidden input + a file list (icon · name · size · `--primary` progress · remove). a11y: labelled button, `role=progressbar`, remove aria-labels | stacked | drag-active transition |
| `SettingsPanel` | RECORD · all | The settings/preferences form (Phase 64 CREATED): grouped labelled `sections`, each a list of rows (label + helper description left, a control — Switch/Input/Select — flush-right), hairline dividers; persist-on-change (Linear model); `stacked` row puts a wide control below | stacked sections; rows wrap | static |

### Composite prop entry points

- `DataTable<TData, TValue>` — `columns` (TanStack `ColumnDef[]`), `data`,
  `enableFiltering?`, `enablePagination?`, `pageSize?`, `emptyState?`, `caption?`.
- `ComparisonTable` — `entities: ComparisonEntity[]`,
  `attributes: ComparisonAttribute[]` (each `format?`, `scoreMax?`, `currency?`),
  `emptyState?`, `caption?`.
- `CardCollection<TItem>` — `items`, `renderItem`, `getKey?`, `layout?`,
  `minCardWidth?`, `emptyState?`.
- `StatDashboard` — `kpis: StatKpi[]` (label/value/deltaPct/hint),
  `chart?: StatChartSpec` (kind/data/categories/colorTokens), `columns?`,
  `emptyState?`.
- `Board<TCard>` — `columns: BoardColumn[]`, `renderCard`, `onMoveCard?`,
  `emptyColumnText?`, `emptyState?`.
- `FormWizard` — `steps: WizardStep[]`, `initialValues?`, `onSubmit?`,
  `onChange?`, `emptyState?`.

---

## Primitives (the shadcn palette — building blocks for the composites + bespoke screens)

All over Radix / cmdk / vaul / react-day-picker, themed through the token
contract. Grouped by role.

### Forms & controls
`Button` · `Input` · `Textarea` · `Label` · `Checkbox` · `RadioGroup` ·
`Switch` · `Slider` · `Select` · `Toggle` · `ToggleGroup`

### Display & data
`Badge` · `Card` · `Alert` · `Avatar` · `Separator` · `Progress` ·
`ScrollArea` · `Table` · `Calendar`

### Navigation
`Tabs` · `Breadcrumb` · `Pagination` · `Menubar` · `Accordion`

### Overlays & menus
`Dialog` · `AlertDialog` · `Sheet` · `Drawer` · `Popover` · `HoverCard` ·
`Tooltip` · `DropdownMenu` · `ContextMenu` · `Command` · `Toast` (+ `Toaster` /
`useToast` / `toast()` — Phase 64 CREATED; status icon + title + desc + action +
close, `destructive` variant, bottom-corner stacked, token surface/motion)

---

## Tokens & helpers

| Export | Purpose |
| --- | --- |
| `tokens.css` (`@prumo/ui/tokens.css`) | the canonical CSS custom-property contract (names + safe defaults) |
| `TOKEN_NAMES`, `TOKEN_FAMILIES`, `COLOR_TOKENS`, … | the typed vocabulary (NC-VOCAB-01) |
| `tokenVar(name, fallback?)` | the only sanctioned token read — `var(--<name>)`, typo-checked |
| `useTokenColors(tokens)` | resolve contract color tokens → concrete colors for chart libs |
| `cn(...)` | the shadcn class-merge helper |
| `TokenSwatch`, `TokenPalette` | the contract-review surface (Storybook `Tokens/Contract`) |

## Token contract families (the skin surface)

`color` (19 roles) · `type` (6) · `spacing` (5) · `radius` (5) · `shadow` (4) ·
`density` (2) · `surface` (5) · `motion` (7) · `font` (2). See `TOKENS.md` for
the per-family producer/consumer seam (companycouncil emits the values; prumo-ui
reads the names).

## Storybook

`Tokens/` → `Primitives/` → `Composites/`. Every composite ships a
**warm-vs-sharp** token-variant story proving the same component re-skins from
the `:root` alone.

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
| `DataTable` | RECORD · INTELLIGENCE | Generic grid (TanStack): sortable columns (`meta.align` right-aligns numerics), global filter, pagination, search + live-count toolbar + actions slot | efficient dense grid, **sticky header**, hairline rows (no zebra); mobile = per-**record** cards (title + labelled rows, single DOM) | feedback-only (hover/sort transitions); NO entrance choreography (C8 — a grid shouldn't stagger every page) |
| `ComparisonTable` | INTELLIGENCE | Anti-ranking comparator: N entities × M attributes; cell formats `text \| badge \| score \| percent \| check \| count \| currency`; optional category groups, Key/All + density toggles, editorial header + sourced legend | true matrix, **frozen label column** + **sticky header**; mobile = frozen anchor + **horizontal-scroll** of entity columns + edge-fade + swipe (single DOM, no card-restack) | row-stagger on mount |
| `CardCollection` | ENGAGEMENT | Feed / listing / search-results / gallery / catalog; `renderItem` template + `layout` (`grid \| list \| masonry`) | auto-fill grid / stacked / CSS columns — all pure CSS reflow | item-stagger on mount |
| `StatDashboard` | INTELLIGENCE | KPI stat-card grid + optional chart (Tremor: area/bar/line/donut) | responsive KPI grid (1→N cols); charts fluid | KPI-stagger on mount; chart colors read tokens via `useTokenColors` |
| `Board` | ACTION | Kanban / pipeline; generic columns + `renderCard` | horizontal columns desktop → **vertical stack** mobile (single DOM); keyboard move buttons | card-stagger on mount |
| `FormWizard` | ACTION | Multi-step form; generic field schema (`text \| number \| textarea \| select \| checkbox \| radio`), progress + next/back/validate/submit | progress reflows; fieldset/legend per step | step fade on advance |

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
`Tooltip` · `DropdownMenu` · `ContextMenu` · `Command`

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

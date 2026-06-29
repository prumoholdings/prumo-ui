/**
 * Catalog manifest — the SOURCE OF TRUTH for which composites are "heavy".
 *
 * A HEAVY component renders a dense / repetitive structure (a data matrix, a grid of
 * many cards, a KPI dashboard, a kanban, a multi-step form). Hand-authoring those inline
 * is exactly what blows the screen-author's output budget → err_cli_timeout → skeleton
 * (the Farol failure). So the rule (chairman 2026-06-29, "it should be by component"):
 *
 *   The screen-author writes every screen CREATIVELY, but any HEAVY region MUST be
 *   COMPOSED from @prumo/ui — never hand-rolled. The dense rendering then lives inside
 *   the component (off the author's output), so the screen stays bounded AND creative.
 *
 * This list is the deterministic definition. The companycouncil render gate MIRRORS it
 * and rejects hand-rolled equivalents (reprompt → "compose <name>"). When a new heavy
 * composite is added to the catalog, tag it HERE (one source of truth) and the gate
 * picks it up via its drift-checked mirror.
 */
export interface HeavyComponent {
  /** The catalog component the author must compose. */
  readonly name: string;
  /** The hand-rolled pattern it replaces (drives the gate's detector + the reprompt). */
  readonly replaces: string;
}

export const HEAVY_COMPONENTS: readonly HeavyComponent[] = [
  { name: "DataTable", replaces: "a hand-rolled <table> of data rows" },
  { name: "ComparisonTable", replaces: "a hand-rolled comparison matrix (multi-column <table>)" },
  { name: "StatDashboard", replaces: "a hand-rolled KPI / stat-card grid" },
  { name: "Board", replaces: "a hand-rolled kanban / pipeline column layout" },
  { name: "CardCollection", replaces: "a hand-rolled grid/list of many repeated cards" },
  { name: "FormWizard", replaces: "a hand-rolled multi-step form" },
  { name: "Timeline", replaces: "a hand-rolled vertical activity / history feed" },
  { name: "DetailView", replaces: "a hand-rolled label/value fact-section layout" },
  { name: "SettingsPanel", replaces: "a hand-rolled settings-rows layout" },
] as const;

export const HEAVY_COMPONENT_NAMES: readonly string[] = HEAVY_COMPONENTS.map((h) => h.name);

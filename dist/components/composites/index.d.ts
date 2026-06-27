/**
 * @prumo/ui — the high-level COMPOSITES mapped to the SaaS frontend archetypes
 * (RECORD / ENGAGEMENT / INTELLIGENCE / ACTION). Each composes the token-reading
 * primitives, owns ONE responsive layout (CSS reflow, never duplicate trees),
 * built-in motion gated on reduced-motion, a safe empty state, and is fully
 * archetype-generic. See CATALOG.md.
 */
export { DataTable } from './data-table';
export type { DataTableProps } from './data-table';
export { ComparisonTable } from './comparison-table';
export type { ComparisonTableProps, ComparisonEntity, ComparisonAttribute, CellFormat, } from './comparison-table';
export { CardCollection } from './card-collection';
export type { CardCollectionProps, CardCollectionLayout } from './card-collection';
export { StatDashboard } from './stat-dashboard';
export type { StatDashboardProps, StatKpi, StatChartSpec, ChartKind, } from './stat-dashboard';
export { Board } from './board';
export type { BoardProps, BoardColumn, BoardCard } from './board';
export { FormWizard } from './form-wizard';
export type { FormWizardProps, WizardStep, WizardField, WizardValues, FieldType, } from './form-wizard';

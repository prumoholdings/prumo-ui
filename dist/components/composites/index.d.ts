/**
 * @prumo/ui — the high-level COMPOSITES mapped to the SaaS frontend archetypes
 * (RECORD / ENGAGEMENT / INTELLIGENCE / ACTION). Each composes the token-reading
 * primitives, owns ONE responsive layout (CSS reflow, never duplicate trees),
 * built-in motion gated on reduced-motion, a safe empty state, and is fully
 * archetype-generic. See CATALOG.md.
 */
export { resolveIcon, renderActionSpecs, renderCardSpec, buildColumnsFromSpec, renderFilterSpecs, renderAsideSpec, } from './field-specs';
export type { ActionSpec, ActionVariant, CardSpec, CardFieldSpec, CardBadgeSpec, BadgeTone, ColumnSpec, ColumnFormat, FilterSpec, AsideSpec, AsideFactSpec, } from './field-specs';
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
export { PageHeader } from './page-header';
export type { PageHeaderProps } from './page-header';
export { FilterBar } from './filter-bar';
export type { FilterBarProps, ActiveFilter } from './filter-bar';
export { DetailView } from './detail-view';
export type { DetailViewProps, DetailSection, DetailFact } from './detail-view';
export { EmptyState } from './empty-state';
export type { EmptyStateProps } from './empty-state';
export { Timeline } from './timeline';
export type { TimelineProps, TimelineEntry } from './timeline';
export { FileUpload } from './file-upload';
export type { FileUploadProps, UploadFile } from './file-upload';
export { SettingsPanel } from './settings-panel';
export type { SettingsPanelProps, SettingsSection, SettingsRow } from './settings-panel';

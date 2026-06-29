import { AsideSpec } from './field-specs';
import * as React from "react";
/**
 * DetailView — one entity's full page (CREATED; Phase 64 creation loop, coverage-map
 * gap #3, the "decide" step). A header (typically a PageHeader) + an optional media
 * hero + grouped, SOURCED label·value fact SECTIONS + an optional sticky aside
 * (actions / summary). The prumo wedge: facts + provenance, NEVER an aggregate
 * score / grade / "recommended" verdict (compare is a separate anti-ranking action).
 *
 * ONE RESPONSIVE LAYOUT: a 2-column body (main + aside) that stacks on mobile from
 * one DOM. Facts are a semantic <dl>. Tokens via var(--*) only.
 */
export interface DetailFact {
    label: string;
    value?: React.ReactNode;
}
export interface DetailSection {
    id: string;
    title: string;
    description?: string;
    /** label·value facts (rendered as a 2-col <dl>). */
    facts?: DetailFact[];
    /** Arbitrary section content (e.g. a chart, a map). */
    children?: React.ReactNode;
}
export interface DetailViewProps {
    /** The page header (typically a PageHeader). */
    header?: React.ReactNode;
    /** An optional hero/media block above the sections. */
    media?: React.ReactNode;
    sections: DetailSection[];
    /** An optional sticky aside (a summary / actions card). Takes precedence over `asideSpec`. */
    aside?: React.ReactNode;
    /** A declarative summary/actions aside (Phase 65 data alternative to `aside`, so a
     * pure-data ScreenPlan can drive it). Used only when `aside` is absent. */
    asideSpec?: AsideSpec;
    /** A provenance footer (the sourced wedge). */
    source?: React.ReactNode;
    className?: string;
    "aria-label"?: string;
}
export declare function DetailView({ header, media, sections, aside, asideSpec, source, className, "aria-label": ariaLabel, }: DetailViewProps): React.JSX.Element;

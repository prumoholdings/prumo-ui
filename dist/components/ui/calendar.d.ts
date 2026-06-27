import { DayPicker } from 'react-day-picker';
import * as React from "react";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
/**
 * Calendar — shadcn primitive over react-day-picker (v10). Selected day via
 * `--primary`, today via `--accent`, nav buttons reuse the Button token styling.
 * No hardcoded color/radius. react-day-picker supplies the grid a11y semantics
 * (role=grid, aria-selected). The library handles its own keyboard nav.
 */
declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): React.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}
export { Calendar };

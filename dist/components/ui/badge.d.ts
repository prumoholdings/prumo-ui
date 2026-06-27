import { VariantProps } from 'class-variance-authority';
import * as React from "react";
/**
 * Badge — shadcn primitive. Variants map to token color roles; radius via
 * `--radius-sm`. No hardcoded color/radius.
 */
declare const badgeVariants: (props?: ({
    variant?: "secondary" | "accent" | "destructive" | "default" | "outline" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, style, ...props }: BadgeProps): React.JSX.Element;
export { Badge, badgeVariants };

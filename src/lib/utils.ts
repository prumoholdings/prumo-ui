import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** The shadcn `cn()` helper — merge clsx class lists, de-duplicating Tailwind
 * utilities via tailwind-merge. The same helper companycouncil provisions at
 * `@/lib/utils`, so components author against the identical contract. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

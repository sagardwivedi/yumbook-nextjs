import { usePathname } from "next/navigation";

/**
 * Checks whether the given href is active based on the current pathname.
 *
 * @param href - The path to check (e.g., "/home", "/profile")
 * @param matchExact - If true, requires exact match. If false, checks if pathname starts with href.
 * @returns boolean indicating if the link is active.
 */
export function useIsActive(href: string, matchExact = false): boolean {
  const pathname = usePathname();

  if (matchExact) {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

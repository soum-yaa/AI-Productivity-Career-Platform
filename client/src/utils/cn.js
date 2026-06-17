/**
 * Join class names — keeps JSX readable without extra dependencies.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

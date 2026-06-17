import { useTheme } from '../context/ThemeContext.jsx';

/**
 * Re-export theme hook for components that only need toggling.
 */
export function useThemeMode() {
  return useTheme();
}

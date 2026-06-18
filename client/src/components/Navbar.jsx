import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeMode } from '../hooks/useThemeMode.js';
import { useAuth } from '../context/AuthContext.jsx';
import { cn } from '../utils/cn.js';

const navLinkClass = ({ isActive }) =>
  cn(
    'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-[var(--color-primary)] text-white'
      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]/60 hover:text-[var(--color-text)]'
  );

export function Navbar({ showSidebarTrigger = false, onMenuClick }) {
  const { theme, toggleTheme } = useThemeMode();
  const { logout, isAuthenticated } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/90 px-3 backdrop-blur md:px-6"
    >
      <div className="flex min-w-0 items-center gap-2">
        {showSidebarTrigger && (
          <button
            type="button"
            className="inline-flex rounded-lg border border-[var(--color-border)] p-2 md:hidden"
            aria-label="Open sidebar"
            onClick={onMenuClick}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <Link to="/" className="truncate text-sm font-semibold tracking-tight">
          PrepTrack<span className="text-[var(--color-primary)]">AI</span>
        </Link>
      </div>

      <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-2 sm:flex">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        )}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-border)]/40"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-primary-hover)]"
          >
            Log out
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold hover:bg-[var(--color-border)]/40"
          >
            Sign in
          </Link>
        )}
      </div>
    </motion.header>
  );
}

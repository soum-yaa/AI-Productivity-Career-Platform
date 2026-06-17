import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-surface)] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-4"
      >
        <p className="text-sm font-semibold text-[var(--color-primary)]">404</p>
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="text-[var(--color-text-muted)]">
          The page you are looking for does not exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)]"
        >
          Back home
        </Link>
      </motion.div>
    </div>
  );
}

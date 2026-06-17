import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex-1 text-[var(--color-text)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-xl space-y-6"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
            AI Productivity & Career
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ship faster. Plan smarter. Grow deliberately.
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            A modern MERN foundation with auth-ready routing, dashboard shell,
            and an API structured for real features.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-primary-hover)]"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-[var(--color-border)] px-5 py-3 text-sm font-semibold hover:bg-[var(--color-border)]/40"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Stack
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              'React + Vite + Tailwind',
              'React Router + Axios + Framer Motion',
              'Express + Mongoose + JWT utilities',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[var(--color-primary)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

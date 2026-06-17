import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api.js';

export default function Dashboard() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await api.get('/api/tasks');
        if (!cancelled) setHealth(data);
      } catch {
        if (!cancelled) setHealth({ message: 'Connect the API to load live data.' });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Starter layout for AI productivity and career workflows.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {['Focus time', 'Goals', 'Network'].map((title, i) => (
          <div
            key={title}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              {title}
            </p>
            <p className="mt-3 text-2xl font-bold">{i === 0 ? '—' : i === 1 ? '—' : '—'}</p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Replace with charts, AI digests, or task rollups.
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <p className="text-sm font-semibold">Sample API response</p>
        <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-muted)]">
          {JSON.stringify(health, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
}

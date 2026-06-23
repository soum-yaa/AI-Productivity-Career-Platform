import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Task Management',
    description:
      'Organize daily preparation, track progress, and stay consistent with your goals.',
    icon: '✅',
  },
  {
    title: 'Application Tracker',
    description:
      'Manage internships, placements, and off-campus applications from one place.',
    icon: '💼',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Visualize productivity, deadlines, interviews, offers, and preparation trends.',
    icon: '📊',
  },
];

export default function Home() {
  return (
    <div className="flex-1 text-[var(--color-text)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              PrepTrack AI
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Track Applications.
              <br />
              Manage Preparation.
              <br />
              Land Your Dream Job.
            </h1>

            <p className="max-w-xl text-lg text-[var(--color-text-muted)]">
              PrepTrack AI helps students organize preparation tasks, monitor
              placement progress, and track internship and job applications from
              a single dashboard.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-primary-hover)]"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-border)]/40"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold">Why PrepTrack AI?</h2>

            <div className="mt-6 space-y-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-[var(--color-border)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{feature.icon}</span>

                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>

                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold">
            Everything You Need For Placement Preparation
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
              <h3 className="text-lg font-semibold">📋 Smart Task Tracking</h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                Create, manage, prioritize, and complete preparation tasks
                efficiently.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
              <h3 className="text-lg font-semibold">💼 Application Tracker</h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                Track applications, interviews, offers, and rejections from one
                centralized workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
              <h3 className="text-lg font-semibold">📈 Progress Analytics</h3>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                Monitor productivity trends and gain insights through visual
                analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api.js';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Todo', 'In Progress', 'Completed'];

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Todo',
  dueDate: '',
};

const priorityStyles = {
  Low: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  High: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
};

const statusStyles = {
  Todo: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
  'In Progress': 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]',
  Completed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
};

function formatDueDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function toInputDate(value) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadTasks = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/api/tasks');
      setTasks(data.tasks);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to load tasks'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      if (query && !task.title.toLowerCase().includes(query)) return false;
      if (statusFilter && task.status !== statusFilter) return false;
      if (priorityFilter && task.priority !== priorityFilter) return false;
      return true;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(task) {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: toInputDate(task.dueDate),
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const payload = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate || null,
    };

    try {
      if (editingId) {
        const { data } = await api.put(`/api/tasks/${editingId}`, payload);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingId ? data.task : t))
        );
      } else {
        const { data } = await api.post('/api/tasks', payload);
        setTasks((prev) => [data.task, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to save task'
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) return;
    setError('');
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to delete task'
      );
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none ring-[var(--color-primary)] focus:ring-2';
  const labelClass = 'text-xs font-medium text-[var(--color-text-muted)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Create, filter, and manage your work items.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (showForm && !editingId) {
              resetForm();
            } else {
              setEditingId(null);
              setForm(EMPTY_FORM);
              setShowForm(true);
            }
          }}
          className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          {showForm && !editingId ? 'Cancel' : 'New task'}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 shadow-sm"
        >
          <p className="text-sm font-semibold">
            {editingId ? 'Edit task' : 'Create task'}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} min-h-20 resize-y`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                className={inputClass}
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Due date</label>
              <input
                type="date"
                className={inputClass}
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
            >
              {submitting ? 'Saving…' : editingId ? 'Update task' : 'Create task'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-border)]/30"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm outline-none ring-[var(--color-primary)] focus:ring-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm outline-none ring-[var(--color-primary)] focus:ring-2"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm outline-none ring-[var(--color-primary)] focus:ring-2"
        >
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--color-text-muted)]">Loading tasks…</p>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-muted)]">
          {tasks.length === 0
            ? 'No tasks yet. Create your first one above.'
            : 'No tasks match your filters.'}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <article
              key={task._id}
              className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[task.status]}`}
                >
                  {task.status}
                </span>
              </div>
              <h2 className="mt-3 font-semibold">{task.title}</h2>
              {task.description && (
                <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">
                  {task.description}
                </p>
              )}
              {task.dueDate && (
                <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                  Due {formatDueDate(task.dueDate)}
                </p>
              )}
              <div className="mt-4 flex gap-2 border-t border-[var(--color-border)] pt-3">
                <button
                  type="button"
                  onClick={() => startEdit(task)}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--color-border)]/30"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task._id)}
                  className="rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </motion.div>
  );
}

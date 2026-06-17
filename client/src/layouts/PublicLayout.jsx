import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-surface)]">
      <Navbar />
      <Outlet />
    </div>
  );
}

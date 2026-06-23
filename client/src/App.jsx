import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout.jsx';
import { DashboardLayout } from './layouts/DashboardLayout.jsx';
import { PublicLayout } from './layouts/PublicLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import NotFound from './pages/NotFound.jsx';
import Applications from "./pages/Applications";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
          <Route path="/dashboard/applications" element={<Applications />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

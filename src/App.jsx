// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import { addNotification } from './redux/slices/notificationSlice';

import Login from './pages/auth/Login';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';

import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Home from './pages/Home';
import CreateEmployee from './pages/AssignTaskToEmployee';
import ProjectDetails from './pages/ProjectDetails'; 
import Unauthorized from './pages/Unauthorized';

import AdminLayout from './layouts/AdminLayout';
import ManagerLayout from './layouts/ManagerLayout';
import EmployeeLayout from './layouts/EmployeeLayout';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks.tasks);

  // 🔁 Check for overdue tasks and notify
  useEffect(() => {
    const now = new Date();

    tasks.forEach(task => {
      if (task.dueDate && new Date(task.dueDate) < now && task.status !== 'Done') {
        dispatch(addNotification(`⏰ Task '${task.title}' is overdue!`));
      }
    });
  }, [tasks, dispatch]);

  // ✅ Protect private routes based on role
  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;
    return children;
  };

  // ✅ Smart redirect after login based on role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'manager':
        return <Navigate to="/manager" replace />;
      case 'employee':
        return <Navigate to="/employee" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Reports />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <ProjectDetails />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="manager">
              <ManagerLayout>
                <ManagerDashboard />
              </ManagerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-employees"
          element={
            <ProtectedRoute role="manager">
              <ManagerLayout>
                <CreateEmployee />
              </ManagerLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <EmployeeDashboard />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        {/* Settings – shared across roles */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              {user?.role === 'admin' && (
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              )}
              {user?.role === 'manager' && (
                <ManagerLayout>
                  <Settings />
                </ManagerLayout>
              )}
              {user?.role === 'employee' && (
                <EmployeeLayout>
                  <Settings />
                </EmployeeLayout>
              )}
            </ProtectedRoute>
          }
        />

        {/* Redirect to dashboard on unknown root route if logged in */}
        <Route path="*" element={renderDashboard()} />
      </Routes>
    </>
  );
}

export default App; 
// src/components/common/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import LayoutTopbar from './LayoutTopbar';
import { useEffect } from "react";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };
useEffect(() => {
  if (!user) {
    navigate("/home");
  }
}, [user, navigate]);
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow-md">
          <div className="text-lg font-semibold text-blue-600">
            Welcome, {user?.name || user?.role}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <FaUserCog />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </header>
<div className="flex-1 flex flex-col">
        {/* ✅ Reusable Topbar */}
        <LayoutTopbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
    </div>
  );
};

export default Layout;

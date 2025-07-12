// src/components/common/LayoutTopbar.jsx
import React, { useState } from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import NotificationPanel from "../notifications/NotificationsPanel";

const LayoutTopbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSetting, setOpenSetting] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-bold text-blue-600 dark:text-white"></h2>
      
      <div className="flex items-center gap-4">
        <NotificationPanel />
      </div>
    </div>
  );
};

export default LayoutTopbar;

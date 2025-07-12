// src/pages/Settings.jsx
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { updateUser } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: user?.name || '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!form.name || !form.password) {
      toast.error('Name and Password are required');
      return;
    }

    dispatch(updateUser({ ...user, name: form.name, password: form.password }));
    toast.success('Profile updated successfully ✅');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-6">
        <h2 className="font-medium mb-2">🌙 Theme</h2>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-700"
        >
          Toggle to {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default Settings;

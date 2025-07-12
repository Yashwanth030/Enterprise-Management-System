// src/components/common/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
    </button>
  );
};

export default ThemeToggle;

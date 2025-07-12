// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403 - Access Denied 🚫</h1>
      <p className="text-lg mb-6">
        You are not authorized to view this page. Please contact your administrator.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;

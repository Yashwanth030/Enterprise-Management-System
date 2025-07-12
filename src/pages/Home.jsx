// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-800 dark:to-gray-900 text-center p-6">
      <h1 className="text-6xl md:text-6xl font-bold mb-6 text-blue-800 dark:text-white">
        🚀 Enterprise Work Management System
      </h1>
      {/* <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
        Organize your enterprise tasks, projects, and teams with ease. Log in to access your personalized dashboard based on your role assigend .
      </p> */}
      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Home;

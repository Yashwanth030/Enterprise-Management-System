import React from 'react';
import TaskStatusBarChart from '../components/charts/TaskStatusBarChart';
import TasksPerProjectBarChart from '../components/charts/TasksPerProjectBarChart';
import ProgressPieChart from '../components/charts/ProgressPieChart';
import ManagerTaskCompletionChart from '../components/charts/ManagerTaskCompletionChart';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">📊 Reports & Analytics</h1>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Task Completion Status</h2>
        <ProgressPieChart />
      </section>

      {/* <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2>
        <TaskStatusBarChart />
      </section> */}

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Tasks per Project</h2>
        <TasksPerProjectBarChart />
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Completed Tasks by Manager</h2>
        <ManagerTaskCompletionChart />
      </section>
    </div>
  );
};

export default Reports;

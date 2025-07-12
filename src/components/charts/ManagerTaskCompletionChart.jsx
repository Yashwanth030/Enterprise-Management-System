// src/components/charts/ManagerTaskCompletionChart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const ManagerTaskCompletionChart = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);

  // Build manager-wise completed task count
  const managerDoneTaskCount = {};

  projects.forEach((project) => {
    const doneTasks = tasks.filter(
      (task) => task.projectId === project.id && task.status === 'Done'
    );

    if (!managerDoneTaskCount[project.manager]) {
      managerDoneTaskCount[project.manager] = 0;
    }

    managerDoneTaskCount[project.manager] += doneTasks.length;
  });

  const data = Object.entries(managerDoneTaskCount).map(([email, count]) => {
    const manager = users.find((u) => u.email === email);
    return {
      name: manager?.name || email,
      completed: count,
    };
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#f59e0b" name="Completed Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManagerTaskCompletionChart;

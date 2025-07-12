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

const TasksPerProjectBarChart = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);

  // Count tasks grouped by projectId
  const projectTaskCounts = projects.map((project) => {
    const taskCount = tasks.filter((task) => task.projectId === project.id).length;
    return {
      name: project.name,
      tasks: taskCount,
    };
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={projectTaskCounts}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasks" fill="#10b981" name="Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksPerProjectBarChart;

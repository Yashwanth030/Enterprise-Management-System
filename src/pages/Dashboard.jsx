// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import RecentActivity from '../components/dashboard/RecentActivity';
import TaskStatusBarChart from '../components/charts/TaskStatusBarChart';

const Dashboard = () => {
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const [notifications, setNotifications] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);

  // Simulate recent activity and notifications
  useEffect(() => {
    const recent = [
      `📌 ${user.name || user.email} logged in.`,
      '✅ Task "Design Homepage" marked as done.',
      '🆕 New project "E-commerce Platform" created.',
    ];
    const notifs = [
      '🔔 Task deadline approaching: “Client Meeting Notes”',
      '🛠️ New bug reported in "API Gateway"',
      '🚨 Task assigned: "Refactor Login Flow"',
    ];
    setActivityFeed(recent);
    setNotifications(notifs);
  }, [user]);

  const completedTasks = tasks.filter(t => t.status === 'Done');
  const pendingTasks = tasks.filter(t => t.status !== 'Done');

  useEffect(() => {
    console.log('Dashboard loaded');
    toast.success('Dashboard loaded');
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard</h1>

      {/* METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <MetricCard title="Total Projects" value={projects.length} color="bg-blue-500" />
        <MetricCard title="Completed Tasks" value={completedTasks.length} color="bg-green-500" />
        <MetricCard title="Pending Tasks" value={pendingTasks.length} color="bg-yellow-500" />
        <MetricCard title="Team Members" value={users.length} color="bg-purple-500" />
      </section>

      {/* ACTIVITY FEED */}
      <section>
        <h2 className="text-lg font-semibold mb-2">📜 Recent Activity</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2">
          {activityFeed.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </section>

      {/* NOTIFICATIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-2">🔔 Notifications</h2>
        <ul className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2">
          {notifications.map((notif, idx) => (
            <li key={idx} className="text-sm text-blue-700 dark:text-blue-300">
              {notif}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
<RecentActivity />

const MetricCard = ({ title, value, color }) => (
  <div className={`${color} p-4 rounded-lg shadow text-white`}>
    <p className="text-sm">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Dashboard;

// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectTable from '../../components/projects/ProjectTable';
import CreateManagerModal from '../../components/users/CreateManagerModal';
import { addNotification } from '../../redux/slices/notificationSlice';
import { useDispatch } from 'react-redux';  

// import TaskStatusBarChart from '../components/charts/TaskStatusBarChart';
import { useEffect } from 'react';

const AdminDashboard = () => {
   const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const [showCreateManagerModal, setShowCreateManagerModal] = useState(false);
const getProjectCompletionStatus = (projectId) => {
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const total = projectTasks.length;
  const completed = projectTasks.filter((t) => t.status === "Done").length;

  if (total === 0) return "Pending";
  if (completed === total) return "Completed";
  return "In Progress";
};
useEffect(() => {
  const newlyCompleted = tasks.filter(
    (task) =>
      task.status === "Done" &&
      !task.notifiedForCompletionByAdmin
  );

  const newlyAssigned = tasks.filter(
    (task) =>
      task.assignedTo &&
      !task.notifiedForAssignmentByAdmin
  );

  newlyCompleted.forEach((task) => {
    dispatch(
      addNotification({
        message: `✅ Task '${task.title}' has been completed by ${task.assignedTo}.`,
        role: "admin",
        type: "success",
      })
    );

    dispatch({
      type: "tasks/updateTaskNotifiedStatus",
      payload: {
        id: task.id,
        notifiedForCompletionByAdmin: true,
      },
    });
  });

  newlyAssigned.forEach((task) => {
    dispatch(
      addNotification({
        message: `📋 Task '${task.title}' assigned to ${task.assignedTo}.`,
        role: "admin",
        type: "info",
      })
    );

    dispatch({
      type: "tasks/updateTaskNotifiedStatus",
      payload: {
        id: task.id,
        notifiedForAssignmentByAdmin: true,
      },
    });
  });
}, [tasks, dispatch]);


  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col">
        {/* <LayoutTopbar /> */}

        <main className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 dark:text-white flex-1 overflow-auto">
          {/* Header and Button */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button
              onClick={() => setShowCreateManagerModal(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow"
            >
              Create Manager & Assign Project
            </button>
          </div>

          {/* Project Table */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            {projects.length > 0 ? (
              <ProjectTable projects={projects} />
            ) : (
              <p className="text-gray-500">No projects found.</p>
            )}
          </section>
        </main>
      </div>

      {showCreateManagerModal && (
        <CreateManagerModal onClose={() => setShowCreateManagerModal(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;

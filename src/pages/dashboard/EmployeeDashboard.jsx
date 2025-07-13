import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/slices/notificationSlice";
import { updateTaskStatus } from "../../redux/slices/taskSlice";
import toast from "react-hot-toast";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { user: employee } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  const activeTasks = tasks.filter(
    (task) => task.assignedTo === employee.email && task.status !== "Done"
  );
  const completedTasks = tasks.filter(
    (task) => task.assignedTo === employee.email && task.status === "Done"
  );

  const [editingComments, setEditingComments] = useState({});

  const handleStatusChange = (taskId, newStatus) => {
   dispatch(updateTaskStatus({
  id: taskId,
  status: newStatus,
  lastUpdatedBy: employee.email,
  managerNotified: false,
}));
  }

  const handleCommentChange = (taskId, value) => {
    setEditingComments((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleCommentSubmit = (taskId) => {
    if (editingComments[taskId] !== undefined) {
      dispatch(updateTaskStatus({ id: taskId, comments: editingComments[taskId] }));
      toast.success("Comment updated");
    }
  };
useEffect(() => {
  tasks.forEach((task) => {
    if (
      task.assignedTo === employee.email &&
      task.status === "Done" &&
      task.comments &&
      !task.notifiedForCompletion
    ) {
      dispatch(
        addNotification({
          message: `✅ Task '${task.title}' marked as completed. 🗒️ Manager's Comment: "${task.comments}"`,
          role: "employee",
          type: "info",
        })
      );

      dispatch(updateTaskStatus({ id: task.id, notifiedForCompletion: true }));
    }
  });
}, [tasks, employee.email, dispatch]);



  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">👨‍💼 Employee Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Welcome, {employee.name || employee.email}
      </p>

      {/* Active Tasks */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📝 Your Tasks</h2>

        {activeTasks.length > 0 ? (
          <ul className="space-y-4">
            {activeTasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700 space-y-2"
              >
                <p className="font-semibold text-lg">{task.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description || "No description"}
                </p>
                <p className="text-sm">📅 Due Date: {task.dueDate || "N/A"}</p>
                <p className="text-sm">⚡ Priority: {task.priority || "Normal"}</p>

                {/* Comment */}
                <div>
                  <label className="block font-medium text-sm mb-1">
                    💬 Comment:
                  </label>
                  <textarea
                    value={editingComments[task.id] ?? task.comments ?? ""}
                    onChange={(e) => handleCommentChange(task.id, e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-600 dark:text-white dark:border-gray-500"
                    placeholder="Enter comments..."
                  />
                  <button
                    onClick={() => handleCommentSubmit(task.id)}
                    disabled={editingComments[task.id] === task.comments}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    💾 Update Comment
                  </button>
                </div>

                {/* Status */}
                <div className="mt-2">
                  <label className="mr-2 font-medium text-sm">Status:</label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="border px-2 py-1 rounded bg-white dark:bg-gray-600 dark:text-white dark:border-gray-500"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            You have no pending tasks.
          </p>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-green-600">
            ✅ Completed Tasks
          </h2>
          <ul className="space-y-4">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded bg-green-50 dark:bg-green-900 dark:border-green-700"
              >
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;

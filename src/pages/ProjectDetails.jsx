import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProjectDetails = () => {
  const { id } = useParams(); // id remains as string for consistency

  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);

  const project = projects.find((p) => p.id.toString() === id);
  const manager = users.find((u) => u.email === project?.manager);

  // Fix: Ensure projectIds are compared as strings
  const employees = users.filter(
    (u) =>
      u.role === 'employee' &&
      Array.isArray(u.projectIds) &&
      u.projectIds.map(String).includes(id)
  );

  const projectTasks = tasks.filter((t) => t.projectId.toString() === id);

  const progress = projectTasks.length
    ? Math.round(
        (projectTasks.filter((t) => t.status === 'Done').length / projectTasks.length) * 100
      )
    : 0;

  useEffect(() => {
    console.log('Users:', users);
    console.log('Project ID:', id);
    console.log('Matched Employees:', employees);
  }, [users, id, employees]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📁 Project Details</h1>

      {/* Project Info */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">📌 Project Info</h2>
        <p><strong>ID:</strong> {project?.id}</p>
        <p><strong>Name:</strong> {project?.name}</p>
        <p><strong>Status:</strong> {project?.status}</p>
      </section>

      {/* Manager Info */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">👤 Manager</h2>
        {manager ? (
          <p>{manager.name} ({manager.email})</p>
        ) : (
          <p className="text-red-500">Manager not found.</p>
        )}
      </section>

      {/* Employees List */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">👷 Assigned Employees</h2>
        {employees.length > 0 ? (
          <ul className="list-disc ml-6">
            {employees.map((emp) => (
              <li key={emp.email}>{emp.name} ({emp.email})</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No employees assigned yet.</p>
        )}
      </section>

      {/* Tasks */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">📝 Project Tasks</h2>
        {projectTasks.length > 0 ? (
          <ul className="space-y-2">
            {projectTasks.map((task) => (
              <li key={task.id} className="border p-2 rounded">
                <strong>{task.title}</strong> — <em>{task.status}</em>
                <br />
                {task.description && (
                  <span className="text-sm text-gray-600">{task.description}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No tasks created for this project.</p>
        )}
      </section>

      {/* Progress */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">✅ Completion Progress</h2>
        <div className="w-full bg-gray-300 h-4 rounded">
          <div
            className="h-4 bg-green-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">{progress}% completed</p>
      </section>
    </div>
  );
};

export default ProjectDetails;

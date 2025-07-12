import React, { useState } from "react";
import { useSelector } from "react-redux";
import EmployeeTaskBoard from "../components/EmployeeTaskBoard";

const CreateEmployee = () => {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  // Get only the projects managed by the logged-in user
  const assignedProjects = projects.filter((p) => p.manager === user.email);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectChange = (e) => {
    const selected = Number(e.target.value) || null;
    setSelectedProjectId(selected);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        🧑‍💼 My Employees - Project Tasks
      </h1>

      {/* Project Selection */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Select a Project:
        </label>
        <select
          className="mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded w-full sm:w-96"
          value={selectedProjectId || ""}
          onChange={handleProjectChange}
        >
          <option value="">-- Select Project --</option>
          {assignedProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task Board for selected project */}
      {selectedProjectId ? (
        <EmployeeTaskBoard
          projectId={selectedProjectId}
          showCommentsEditable={true}
          showPerTaskUpdateButton={true}
        />
      ) : (
        <p className="text-gray-500 italic dark:text-gray-400">
          Please select a project to view assigned employee tasks.
        </p>
      )}
    </div>
  );
};

export default CreateEmployee;

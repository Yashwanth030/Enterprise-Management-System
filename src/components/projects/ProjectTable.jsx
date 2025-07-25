import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import { deleteTasksByProjectId } from '../../redux/slices/taskSlice';
import { addNotification } from '../../redux/slices/notificationSlice';

function ProjectTable({ onEdit, filterByManager }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  // Function to compute status based on task progress
  const getProjectStatus = (projectId) => {
    const projectTasks = tasks.filter((t) => t.projectId === projectId);
    if (projectTasks.length === 0) return 'Pending';
    const completed = projectTasks.filter((t) => t.status === 'Done').length;
    if (completed === projectTasks.length) return 'Completed';
    return 'Ongoing';
  };

  const filteredProjects = filterByManager
    ? projects.filter((proj) => proj.manager === filterByManager)
    : projects;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold">
          <tr>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Manager</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
          {filteredProjects.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No projects found
              </td>
            </tr>
          ) : (
            filteredProjects.map((project) => (
              <tr
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{project.name}</td>
                <td className="px-4 py-2">{project.manager}</td>
                <td className="px-4 py-2">{getProjectStatus(project.id)}</td>
                <td className="px-4 py-2 space-x-2">
                  {/* Uncomment if you want Edit button */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(project);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteProject(project.id));
                      dispatch(deleteTasksByProjectId(project.id));
                      dispatch(addNotification(`🗑️ Project '${project.name}' and its tasks deleted.`));
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;

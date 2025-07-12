import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTaskStatus } from "../../redux/slices/taskSlice";
import { login } from "../../redux/slices/authSlice";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { addNotification } from "../../redux/slices/notificationSlice";

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { user: manager } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);
  const { tasks } = useSelector((state) => state.tasks);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Normal",
  });

  useEffect(() => {
    const latestManager = users.find(
      (u) => u.email === manager.email && u.role === "manager"
    );
    if (
      latestManager &&
      JSON.stringify(latestManager.projectIds) !== JSON.stringify(manager.projectIds)
    ) {
      dispatch(login(latestManager));
    }
  }, [users, manager, dispatch]);

  useEffect(() => {
    const pending = tasks.filter(
      (task) => task.assignedTo && task.status !== "Done"
    );

    if (pending.length > 0) {
      dispatch(
        addNotification({
          message: `🔔 ${pending.length} employee task(s) are pending.`,
          role: "manager",
          type: "info",
        })
      );
    }
  }, [tasks, dispatch]);

  const assignedProjects = projects.filter((p) => p.manager === manager.email);
  const columns = ["To Do", "In Progress", "Done"];

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !selectedProjectId)
      return toast.error("Enter task title and select project");

    const task = {
      id: Date.now().toString(),
      ...newTask,
      projectId: selectedProjectId,
      assignedTo: "",
      status: "To Do",
    };

    dispatch(addTask(task));
    setNewTask({ title: "", description: "", priority: "Normal" });
    toast.success("Task created");
  };

  const handleDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;

    const taskId = draggableId.replace("task-", "");
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const destId = destination.droppableId;

    if (destId.startsWith("emp-")) {
      const email = destId.replace("emp-", "");
      dispatch(updateTaskStatus({ id: taskId, status: task.status, assignedTo: email }));
    } else {
      dispatch(
        updateTaskStatus({
          id: taskId,
          status: destId,
          assignedTo: task.assignedTo,
        })
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-9 text-gray-900 dark:text-white">Manager Dashboard</h1>

      {assignedProjects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No projects assigned to you.</p>
      ) : (
        assignedProjects.map((project) => {
          const employees = users.filter(
            (u) => u.role === "employee" && u.projectIds?.includes(project.id)
          );

          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const completed = projectTasks.filter((t) => t.status === "Done").length;
          const progress = projectTasks.length
            ? Math.round((completed / projectTasks.length) * 100)
            : 0;

          return (
            <div
              key={project.id}
              className="mb-10 border rounded bg-white dark:bg-gray-800 p-4 shadow text-gray-900 dark:text-white"
            >
              <h2 className="text-xl font-semibold mb-2">📌 {project.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Project ID: {project.id}</p>

              <div className="mb-4">
                <p className="text-sm font-medium">Progress: {progress}%</p>
                <div className="bg-gray-300 dark:bg-gray-700 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Task Form */}
              <div className="mb-4 flex flex-wrap gap-2">
                <input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task Title"
                  className="border dark:border-gray-600 dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                />
                <input
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description"
                  className="border dark:border-gray-600 dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                />
                <input
                  type="date"
                  value={newTask.dueDate || ""}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="border dark:border-gray-600 dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="border dark:border-gray-600 dark:bg-gray-900 dark:text-white px-2 py-1 rounded"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
                <button
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    handleCreateTask();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  ➕ Add Task
                </button>
              </div>

              {/* Task Board */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 min-w-[800px]">
                    {columns.map((col) => (
                      <Droppable droppableId={col} key={col}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded w-[250px] flex-shrink-0 max-h-[500px] overflow-y-auto"
                          >
                            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">{col}</h3>
                            {projectTasks
                              .filter((t) => t.status === col)
                              .map((task, index) => (
                                <Draggable draggableId={`task-${task.id}`} index={index} key={task.id}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 mb-2 rounded shadow transition-all duration-200 ${
                                        snapshot.isDragging
                                          ? "border border-blue-500 shadow-lg scale-105"
                                          : ""
                                      }`}
                                    >
                                      <p className="font-semibold">{task.title}</p>
                                      <p className="text-xs text-green-600">🎯 {task.priority}</p>
                                      <p className="text-xs text-blue-600">👤 {task.assignedTo || "Unassigned"}</p>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                </div>

                {/* Employee Assignment Zones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {employees.map((emp) => (
                    <Droppable droppableId={`emp-${emp.email}`} key={emp.email}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded shadow border border-dashed border-blue-300 min-h-[150px] max-h-[300px] overflow-y-auto"
                        >
                          <h4 className="font-semibold mb-2">
                            👷 {emp.name} ({emp.email})
                          </h4>
                          {projectTasks
                            .filter((t) => t.assignedTo === emp.email)
                            .map((task, index) => (
                              <Draggable
                                draggableId={`task-${task.id}`}
                                index={index}
                                key={task.id}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-gray-100 dark:bg-gray-700 p-2 my-2 rounded shadow ${
                                      snapshot.isDragging
                                        ? "border border-blue-400 scale-105"
                                        : ""
                                    }`}
                                  >
                                    {task.title}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ManagerDashboard;

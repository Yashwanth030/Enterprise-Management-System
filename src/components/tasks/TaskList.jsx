import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

const TaskList = ({ projectId = null }) => {
  const { tasks } = useSelector((state) => state.tasks);

  const filteredTasks = projectId
    ? tasks.filter((t) => t.projectId === projectId)
    : tasks;

  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <p className="text-gray-500 italic">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;

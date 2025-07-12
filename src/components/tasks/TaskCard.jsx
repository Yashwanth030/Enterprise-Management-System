import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/slices/taskSlice';
import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task deleted');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-IN');
  };

  return (
    <div className="border p-3 rounded shadow bg-gray-50 dark:bg-gray-700 dark:text-white">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">
        📌 Priority: {task.priority || 'Normal'} <br />
        🗓 Due: {formatDate(task.dueDate)}
      </div>
      <button
        onClick={handleDelete}
        className="mt-2 text-xs text-red-500 hover:underline"
      >
        ❌ Delete
      </button>
    </div>
  );
};

export default TaskCard;

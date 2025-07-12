// src/components/tasks/TaskKanbanBoard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { updateTaskStatus } from '../../redux/slices/taskSlice';

const columns = [
  { status: 'To Do', title: '📝 To Do' },
  { status: 'In Progress', title: '⏳ In Progress' },
  { status: 'Done', title: '✅ Done' },
];

const TaskKanbanBoard = ({ projectId }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const filteredTasks = projectId
    ? tasks.filter((t) => t.projectId === projectId)
    : tasks;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    dispatch(updateTaskStatus({ id: draggableId, status: destination.droppableId }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const tasksByStatus = filteredTasks.filter((task) => task.status === col.status);
          return (
            <Droppable droppableId={col.status} key={col.status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow min-h-[300px]"
                >
                  <h2 className="text-lg font-bold mb-3">{col.title}</h2>
                  {tasksByStatus.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskKanbanBoard;

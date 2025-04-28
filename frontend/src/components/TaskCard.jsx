import React from 'react';

export default function TaskCard({ task, onToggle, onDelete }) {
  const createdDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Map priorities to Tailwind badge classes
  const priorityClasses = {
    high:   'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low:    'bg-green-100 text-green-800'
  }[task.priority.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white p-4 rounded shadow mb-3  flex justify-between ">
      <div>
        <h3
          className={`text-lg font-semibold ${
            task.status === 'completed' ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">{task.description}</p>

        <div className="flex items-center space-x-2 mb-2">
          <span className={`uppercase font-medium text-xs px-2 py-1 rounded ${priorityClasses}`}>
            {task.priority}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <span className="capitalize">{task.status}</span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Created at: {createdDate}</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => onToggle(task)}
          className="p-1 hover:bg-gray-100 rounded"
          title={task.status === 'active' ? 'Mark Complete' : 'Mark Active'}
        >
          {task.status === 'active' ? '✓' : '↩️'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-1 hover:bg-gray-100 rounded"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

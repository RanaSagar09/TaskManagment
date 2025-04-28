// src/pages/Home.jsx
import React, { useContext, useState } from 'react';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Slidebar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { AuthContext } from '../context/AuthContext';
import { TaskContext, TaskProvider } from '../context/TaskContext';
import { PlusIcon } from '@heroicons/react/24/solid';

function InnerHome() {
  const { logout } = useContext(AuthContext);
  const { tasks, filter, setFilter, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [modalOpen, setModalOpen] = useState(false);

  // sorted logic as before…
  const visible = filter === 'all'
    ? [...tasks].sort((a,b)=>(a.status==='completed'?1:-1) || new Date(b.createdAt)-new Date(a.createdAt))
    : tasks.filter(t => t.status === filter);

  return (
    <div className=" flex  h-[99%]">
      <Sidebar filter={filter} setFilter={setFilter} />
      <main className="flex-1 h-screen mx-auto">
  <NavBar />

  <div className="m-4 h-[85%] dark:bg-gray-900 bg-gray-50 p-4 rounded flex flex-col">
    {/* Container flex column */}
    
    <div
  className="flex-1 overflow-y-auto"
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar in Firefox/IE
>



      {/* Scrollable area */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={() => updateTask(task._id, { status: task.status === 'active' ? 'completed' : 'active' })}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  </div>

</main>

      <TaskForm
  isOpen={modalOpen}
  closeModal={() => setModalOpen(false)}
  onAdd={addTask}
/>

<button
  onClick={() => setModalOpen(true)}
  className="fixed bottom-15 right-12 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
>
  <PlusIcon className="w-6 h-6" />
</button>

    </div>
  );
}

export default function Home() {
  return (
    <TaskProvider>
      <InnerHome />
    </TaskProvider>
  );
}

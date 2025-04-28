import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function TaskForm({ isOpen, closeModal, onAdd }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');

  const submit = e => {
    e.preventDefault();
    onAdd({ title, description: desc, priority });
    setTitle('');
    setDesc('');
    setPriority('medium');
    closeModal();
  };

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-200"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Dialog
        as="div"
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
         

          {/* vertical centering hack */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title as="h3" className="text-lg dark:text-white font-medium">
                  New Task
                </Dialog.Title>
                <button onClick={closeModal}>
                  <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-white dark:border-gray-600"
                />
                <textarea
                  placeholder="Description"
                  rows="3"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-white dark:border-gray-600"
                />
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-white dark:border-gray-600"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Add Task
                </button>
              </form>
            </Dialog.Panel>
         
        </div>
      </Dialog>
    </Transition>
  );
}

// src/components/NavBar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { logout } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');

  function changeTheme() {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header className="bg-white dark:bg-gray-800  shadow-md   ">
      <div className="mx-1  flex items-center justify-between  p-4">
        <div className='justify-start mx-4  flex'>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">TaskMaster</h1>
        </div>
        
        <div className="flex items-center justify-end space-x-4  ">
          <button
            onClick={changeTheme}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle light/dark"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>

          <button
            onClick={logout}
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

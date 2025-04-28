// src/components/Sidebar.jsx
import React from 'react';
import {
  FunnelIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ filter, setFilter }) {
  const tabs = [
    { key: 'all',       label: 'All',    icon: FunnelIcon },
    { key: 'active',    label: 'Active', icon: ClipboardDocumentListIcon },
    { key: 'completed', label: 'Done',   icon: CheckCircleIcon },
  ];

  return (
    <aside className="hidden md:flex flex-col space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-b rounded-l-lg">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const active = filter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`
              flex items-center space-x-2 px-6 py-2 rounded 
              ${active 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </aside>
  );
}

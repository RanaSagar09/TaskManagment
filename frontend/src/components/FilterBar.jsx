import React from 'react';
export default function FilterBar({ filter, setFilter }) {
    const tabs = [
      { key: 'all', label: 'All' },
      { key: 'active', label: 'Active' },
      { key: 'completed', label: 'Completed' }
    ];
    return (
      <div className="flex space-x-4 mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-3 py-1 rounded ${
              filter === t.key ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }
  
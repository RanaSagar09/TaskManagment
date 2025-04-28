import { createContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApi';
import React from 'react';

export const TaskContext = createContext();

const initialState = { tasks: [], filter: 'all' };
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS': return { ...state, tasks: action.payload };
    case 'ADD_TASK': return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t._id === action.payload._id ? action.payload : t)
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t._id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default: return state;
  }
}

export function TaskProvider({ children }) {
  const api = useApi();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/tasks');
        dispatch({ type: 'SET_TASKS', payload: res.data });
      } catch (e) {
        toast.error(e.response?.data?.message || 'Failed to load tasks');
      }
    })();
  }, []);

  const addTask = async (data) => {
    try {
      const res = await api.post('/tasks', data);
      dispatch({ type: 'ADD_TASK', payload: res.data });
      toast.success('Task added');
    } catch (e) { toast.error('Error adding task'); }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/tasks/${id}`, updates);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
    } catch (e) { toast.error('Error updating task'); }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted');
    } catch (e) { toast.error('Error deleting'); }
  };

  const setFilter = (filter) => dispatch({ type: 'SET_FILTER', payload: filter });

  return (
    <TaskContext.Provider value={{ ...state, addTask, updateTask, deleteTask, setFilter }}>
      {children}
    </TaskContext.Provider>
  );
}

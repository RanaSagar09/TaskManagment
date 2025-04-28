// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const api = useApi();

  // Initialize user from localStorage synchronously to avoid redirect flicker
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // On mount, hydrate token into API client and end loading
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
    }
    setLoading(false);
  }, []);  // run once

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: u } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    api.setToken(token);
    setUser(u);
  };

  const register = async (email, password) => {
    const res = await api.post('/auth/register', { email, password });
    const { token, user: u } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    api.setToken(token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.setToken(null);
    setUser(null);
  };

  // Prevent rendering before we’ve set up the token
  if (loading) {
    return null; // or your <Spinner /> component
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

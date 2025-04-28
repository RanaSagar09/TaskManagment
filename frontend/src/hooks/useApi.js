// src/hooks/useApi.js
import axios from 'axios';
import { useRef, useMemo } from 'react';

export default function useApi() {
  // Keep token in ref so interceptor always reads latest value
  const tokenRef = useRef(localStorage.getItem('token'));

  // Create axios instance once
  const instance = useMemo(() => {
    const inst = axios.create({
      baseURL:  'http://localhost:5000/api',
    });
    inst.interceptors.request.use((config) => {
      const t = tokenRef.current;
      if (t) config.headers.Authorization = `Bearer ${t}`;
      return config;
    });
    return inst;
  }, []);

  // Method to update the ref (no state triggers)
  function setToken(newToken) {
    tokenRef.current = newToken || null;
  }

  return {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    setToken,
  };
}

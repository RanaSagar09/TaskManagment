import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import  AuthProvider  from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoutes';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}

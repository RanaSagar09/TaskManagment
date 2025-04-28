// src/components/RegisterForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <label className="block mb-2 text-gray-700">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

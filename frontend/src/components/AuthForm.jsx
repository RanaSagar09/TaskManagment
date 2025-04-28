import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) await login(email, password);
      else await register(email, password);
      navigate('/');
    } catch (_) {}
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email" placeholder="Email"
        value={email} onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}

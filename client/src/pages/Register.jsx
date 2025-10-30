// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
      </p>
    </div>
  );
}
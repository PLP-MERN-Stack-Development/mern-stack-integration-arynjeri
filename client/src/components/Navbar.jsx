// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BlogApp</Link>
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          {user ? (
            <>
              <Link to="/create">New Post</Link>
              <span className="hidden sm:inline">Hi, {user.username}</span>
              <button onClick={logout} className="underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
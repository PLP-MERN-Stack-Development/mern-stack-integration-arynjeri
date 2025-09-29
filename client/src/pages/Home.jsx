import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {!user ? (
        // User not logged in
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome to My App</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </div>
        </>
      ) : (
        // User logged in → Dashboard with Posts links
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="mb-4">Welcome, {user.username}!</p>
          <div className="flex flex-col space-y-2">
            <Link to="/posts" className="text-indigo-600 hover:underline">View Posts</Link>
            <Link to="/posts/new" className="text-indigo-600 hover:underline">Create New Post</Link>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = authService.getCurrentUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const login = async (creds) => {
    const data = await authService.login(creds);
    setUser(data.user);
    navigate('/');
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    setUser(data.user);
    navigate('/');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
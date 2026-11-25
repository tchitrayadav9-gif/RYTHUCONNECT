/**
 * Authentication Context (Module 4: JWT & User State)
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rythu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('rythu_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('rythu_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          // Token may have expired or server offline
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: loggedUser, token: authToken } = res.data;

      setUser(loggedUser);
      setToken(authToken);
      localStorage.setItem('rythu_token', authToken);
      localStorage.setItem('rythu_user', JSON.stringify(loggedUser));
      setLoading(false);
      return loggedUser;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', userData);
      const { user: registeredUser, token: authToken } = res.data;

      setUser(registeredUser);
      setToken(authToken);
      localStorage.setItem('rythu_token', authToken);
      localStorage.setItem('rythu_user', JSON.stringify(registeredUser));
      setLoading(false);
      return registeredUser;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rythu_token');
    localStorage.removeItem('rythu_user');
  };

  // Instant 1-click Demo Login for Academic Evaluators
  const demoLogin = async (role = 'FARMER') => {
    const email = `${role.toLowerCase()}@rythuconnect.com`;
    return login(email, 'password123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        demoLogin,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

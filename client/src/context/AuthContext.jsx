/**
 * Customer Authentication Context (Google OAuth Only)
 * Repository: RYTHUCONNECT (Customer Website)
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_customer_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('rythu_customer_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('rythu_customer_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          // Token expired or server offline
        });
    }
  }, [token]);

  // Google Sign-In Handler
  const handleGoogleAuth = async (credentialResponse, profileData = null) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        credential: credentialResponse?.credential,
        profile: profileData
      };

      const res = await api.post('/auth/google', payload);
      const { user: customerUser, token: authToken } = res.data;

      setUser(customerUser);
      setToken(authToken);
      localStorage.setItem('rythu_customer_token', authToken);
      localStorage.setItem('rythu_customer_user', JSON.stringify(customerUser));
      setLoading(false);
      return customerUser;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Google Sign-In failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rythu_customer_token');
    localStorage.removeItem('rythu_customer_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        handleGoogleAuth,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

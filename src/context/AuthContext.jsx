import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Simulate login
  const login = (email, password) => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    closeAuthModal();
  };

  // Simulate logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthModalOpen,
    isAuthenticated,
    openAuthModal,
    closeAuthModal,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

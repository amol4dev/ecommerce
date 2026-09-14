import React, { createContext, useState } from 'react';
import { store } from '../redux/store';
import { clearCart } from '../redux/cartSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );

  const login = (userData) => {
    // Clear any previous user's cart before logging in new user
    store.dispatch(clearCart());
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    // Clear cart on logout so it doesn't bleed into next session
    store.dispatch(clearCart());
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

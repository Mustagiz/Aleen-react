import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [loading, setLoading] = useState(true);

  // Sync admin password from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'auth'), (snapshot) => {
      if (snapshot.exists()) {
        setAdminPassword(snapshot.data().password);
      } else {
        // Initialize if not exists
        setDoc(doc(db, 'settings', 'auth'), { password: 'admin123' });
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = (email, password) => {
    if (email === 'admin@aleen.com' && password === adminPassword) {
      const userData = { email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  };

  const changePassword = (currentPassword, newPassword) => {
    if (currentPassword !== adminPassword) {
      return Promise.reject(new Error('Current password is incorrect'));
    }
    return setDoc(doc(db, 'settings', 'auth'), { password: newPassword });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

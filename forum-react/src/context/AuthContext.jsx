import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

  const register = (username, email, password) => {
    // Check if user already exists
    if (users.find((u) => u.username === username)) {
      throw new Error('Username already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      memberSince: new Date().toLocaleDateString(),
      profilePic: ''
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', username);
    setCurrentUser(username);

    return newUser;
  };

  const login = (username, password) => {
    const user = users.find(u => u.username === username);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error('Incorrect password');
    }

    localStorage.setItem('currentUser', username);
    setCurrentUser(username);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

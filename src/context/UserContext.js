import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load token and user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save token and user to localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Optional: logout function
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};




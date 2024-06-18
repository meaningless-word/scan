import React, { createContext, useState } from "react";
import { isExpired as isExpired_JWT } from "react-jwt";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const parsed = JSON.parse(saved);
    return parsed;
  });

  const signIn = (token, cb) => {
    localStorage.setItem("token", JSON.stringify(token));
    cb();
  };

  const signOut = (cb) => {
    localStorage.removeItem("token");
    cb();
  };

  const isExpired = () => {
    const saved = localStorage.getItem("token");
    const parsed = JSON.parse(saved);
    return !parsed || isExpired_JWT(parsed.accessToken);
  };

  const value = { token, signIn, signOut, isExpired };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

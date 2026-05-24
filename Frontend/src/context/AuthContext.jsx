import { createContext , useEffect, useState } from "react";
import React from "react";
import request from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const checkSession = async () => {
      try {
        const response = await request({ endpoint: "/api/usuarios/me",method: "GET" });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);



const login = async (credentials) => {
  const response = await request({
    endpoint: "/api/usuarios/login",
    method: "POST",
    data: credentials}
  );
  if (response.status === 200) {
    setUser(response.data);
    return response;
  }
}

const logout = async () => {
  await request({
    endpoint: "/api/usuarios/logout", method: "POST"});
    setUser(null);
  };
  if (loading)return <div>Loading...</div>;
return (
  <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};
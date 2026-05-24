import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Cadastrar from "./pages/Cadastrar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
      </Routes>    
    </Router>
    </AuthProvider>
  );
}
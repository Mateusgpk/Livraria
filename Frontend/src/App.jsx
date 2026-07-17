import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Cadastrar from "./pages/Cadastrar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import CadastroLivro from "./pages/cadastrarLivro"; 
import CadastrarEditora from "./pages/cadastrarEditora";

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}><Home /></ProtectedRoute>} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrarLivro" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><CadastroLivro /></ProtectedRoute>} />
        <Route path="/cadastrarEditora" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><CadastrarEditora /></ProtectedRoute>} />
      </Routes>    
    </Router>
    </AuthProvider>
  );
}
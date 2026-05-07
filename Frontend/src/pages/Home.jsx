import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    if (!localStorage.getItem("token")) {
        navigate("/login");
    }
    return (
        <div>
            <h1>Bem-vindo à Livraria!</h1>
            <p>Explore nossa coleção de livros e encontre suas próximas leituras favoritas.</p>
        </div>
    );
}
import React from 'react';
import { AuthContext } from "../context/AuthContext";

import { useContext, useEffect } from "react";
export default function Home() {
const { user, logout } = useContext(AuthContext);
    return (
        <div>
        <div>
            <h1>Bem-vindo à Livraria!</h1>
            <p>Explore nossa coleção de livros e encontre suas próximas leituras favoritas.</p>
        </div>

        <div>
            <h2>Olá {user?.email}!</h2>
            <h2>Olá {user?.nome}!</h2>
        </div>
        <button onClick={logout}>Logout</button>
        </div>

    );
}
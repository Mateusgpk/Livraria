import React from "react";
import axios from "axios";
import { useState } from "react";
export default function Cadastrar() {

  const [usuario, setUsuario] = useState({
    email: "",
    nome: "",
    senha: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/api/usuarios/registrar", usuario);
        console.log(response.data);
        alert("Usuário cadastrado com sucesso!");
    }catch (error){
        console.error("Erro ao cadastrar usuário:", error);
    }
  };
    return (
    <div>
      <h1>Cadastrar</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={usuario.email} onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required value={usuario.nome} onChange={(e) => setUsuario({...usuario, nome: e.target.value})} />
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required value={usuario.senha} onChange={(e) => setUsuario({...usuario, senha: e.target.value})} />
        <button type="submit">Cadastrar</button>
        <br />
      </form>
    </div>
  );
}
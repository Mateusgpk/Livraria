import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [usuario, setUsuario] = useState( {
        email: "",
        senha: ""
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/usuarios/login", usuario);
            console.log(response.data);
            alert("Login bem-sucedido!");
            if(response.status === 200){
                navigate("/");
            }
        }catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Falha no login."+(error.response ? " " + error.response.data : ""));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={usuario.email} onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={usuario.senha} onChange={(e) => setUsuario({...usuario, senha: e.target.value})} />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
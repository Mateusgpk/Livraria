import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cadastrar">Cadastrar</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cadastrarLivro">Cadastrar Livro</Link></li>
        <li><Link to="/cadastrarEditora">Cadastrar Editora</Link></li>
      </ul>
    </nav>
  );
}
import React, { useState, useEffect } from "react";
import livroService from "../services/livroservice"; // Ajuste o caminho para o seu arquivo request

const CadastroLivro = () => {
  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState("");
  const [editoraId, setEditoraId] = useState("");

  // Estados extras para controlar o fluxo da tela
  const [editoras, setEditoras] = useState([]); // Para listar no <select>
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // Carrega as editoras cadastradas assim que a tela abre, para o admin poder escolher uma
  useEffect(() => {
    const carregarEditoras = async () => {
      try {
        const response = await request({ endpoint: "/api/editoras" }); // Ajuste para sua rota de editoras
        setEditoras(response.data);
      } catch (error) {
        console.error("Erro ao carregar editoras:", error);
      }
    };
    carregarEditoras();
  }, []);

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ tipo: "", texto: "" });

    
    const novoLivro = {
      titulo: titulo,
      editora: {
        id: Number(editoraId),
      },
    };

    try {
      await livroservice.cadastrarLivro(novoLivro);

      // Se der certo:
      setMensagem({ tipo: "sucesso", texto: "Livro cadastrado com sucesso!" });
      setTitulo("");
      setEditoraId("");
    } catch (error) {
      // Se der errado (ex: 403 se não for ADMIN, ou erro de banco)
      const erroTexto = error.message || "Erro ao cadastrar livro. Verifique suas permissões.";
      setMensagem({ tipo: "erro", texto: erroTexto });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Cadastrar Novo Livro</h2>

      {mensagem.texto && (
        <div style={{
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "4px",
          backgroundColor: mensagem.tipo === "sucesso" ? "#d4edda" : "#f8d7da",
          color: mensagem.tipo === "sucesso" ? "#155724" : "#721c24"
        }}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="titulo" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Título do Livro:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Ex: O Código Da Vinci"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="editora" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Editora:</label>
          <select
            id="editora"
            value={editoraId}
            onChange={(e) => setEditoraId(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Selecione uma editora...</option>
            {editoras.map((edit) => (
              <option key={edit.id} value={edit.id}>
                {edit.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Salvando..." : "Cadastrar Livro"}
        </button>
      </form>
    </div>
  );
};

export default CadastroLivro;
import React, { useState } from 'react';
import  editoraService  from '../services/editoraService';
const CadastrarEditora = () => {
  const [nome, setNome] = useState('');

return (
    <div>
      <h2>Cadastrar Editora</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await editoraService.cadastrarEditora({ name: nome });
        setNome('');
        setEndereco('');
        setTelefone('');
      }}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );

};

export default CadastrarEditora;


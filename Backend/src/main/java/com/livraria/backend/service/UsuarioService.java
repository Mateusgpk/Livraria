package com.livraria.backend.service;

import com.livraria.backend.model.Usuario;
import com.livraria.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    public Usuario salvar(Usuario usuario){
        return repository.save(usuario);
    }
    public Usuario autenticar(String email, String senha){
        Usuario usuario = repository.findByEmail(email).orElseThrow(()-> new RuntimeException("Usuario não encontrado"));
        if (!usuario.getSenha().equals(senha)){
            throw new RuntimeException("Senha incorreta!");
        }
        return usuario;

    }
}

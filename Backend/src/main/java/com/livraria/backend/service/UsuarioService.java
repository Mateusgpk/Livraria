package com.livraria.backend.service;

import com.livraria.backend.model.Usuario;
import com.livraria.backend.model.enums.UserRole;
import com.livraria.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario salvar(Usuario usuario){
        String passwordCrip= passwordEncoder.encode(usuario.getSenha());
        usuario.setRole(UserRole.USER);
        usuario.setSenha(passwordCrip);
        return repository.save(usuario);
    }
    public Usuario autenticar(String email, String senha){
        Usuario usuario = repository.findByEmail(email).orElseThrow(()-> new RuntimeException("Usuario não encontrado"));
        if (!passwordEncoder.matches(senha,usuario.getSenha())){
            throw new RuntimeException("Senha incorreta!");
        }
        return usuario;


    }
}

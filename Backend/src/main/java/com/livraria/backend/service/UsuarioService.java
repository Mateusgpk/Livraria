package com.livraria.backend.service;

import com.livraria.backend.model.Usuario;
import com.livraria.backend.model.enums.UserRole;
import com.livraria.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {
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
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado com email:" + email));
    }
}

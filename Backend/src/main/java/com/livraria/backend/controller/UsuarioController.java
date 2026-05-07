package com.livraria.backend.controller;

import com.livraria.backend.model.Usuario;
import com.livraria.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    @Autowired
    private UsuarioService service;
    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario){
        Usuario novoUsuario= service.salvar(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData){
        try {
            Usuario usuario = service.autenticar(loginData.getEmail(),loginData.getSenha());
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}

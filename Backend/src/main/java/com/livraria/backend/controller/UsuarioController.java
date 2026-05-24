package com.livraria.backend.controller;

import com.livraria.backend.config.SecurityConfig;
import com.livraria.backend.model.Usuario;
import com.livraria.backend.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityContextRepository securityContextRepository;

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario){
        Usuario novoUsuario= service.salvar(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData, HttpServletRequest request, HttpServletResponse response){
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken( loginData.getEmail(), loginData.getSenha());
            Authentication authentication = authenticationManager.authenticate(token);

            SecurityContext  context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
            securityContextRepository.saveContext(context, request, response);

            Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
            Map<String, Object> userData = new HashMap<>();
            userData.put("email", authentication.getName());
            userData.put("role", authentication.getAuthorities().iterator().next().getAuthority());
            userData.put("nome", usuarioLogado.getNome());
            return  ResponseEntity.ok(userData);


        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos");
        }
    }
    @GetMapping("/me")
    public ResponseEntity<?> getUserAtual(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication==null|| authentication.getName().equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Não autenticado");
        }

        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();

        Map<String, Object> userData = new HashMap<>();
        userData.put("email", authentication.getName());

        userData.put("role", authentication.getAuthorities().iterator().next().getAuthority());
        userData.put("nome", usuarioLogado.getNome());

        return ResponseEntity.ok(userData);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        request.getSession().invalidate();
        return  ResponseEntity.ok("Logout realizado");
    }
}

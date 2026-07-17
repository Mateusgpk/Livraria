package com.livraria.backend.controller;

import com.livraria.backend.model.Livro;
import com.livraria.backend.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/livros")
@RequiredArgsConstructor
public class LivroController {

    private final LivroService service;



    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Livro> addLivro(@RequestBody Livro livro){
        Livro novoLivro = service.addlivro(livro);
        return new ResponseEntity<>(novoLivro, HttpStatus.CREATED);
    }

}

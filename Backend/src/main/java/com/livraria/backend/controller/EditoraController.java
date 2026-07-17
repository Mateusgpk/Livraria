package com.livraria.backend.controller;

import com.livraria.backend.model.Editora;
import com.livraria.backend.service.EditoraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/editoras")
@RequiredArgsConstructor
public class EditoraController {

    private final EditoraService service;


    @GetMapping
    public ResponseEntity<List<Editora>> getAll() {
        return ResponseEntity.ok(service.listarTodas());
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Editora> create(@RequestBody Editora editora) {
        Editora novaEditora = service.salvar(editora);
        return new ResponseEntity<>(novaEditora, HttpStatus.CREATED);
    }
}
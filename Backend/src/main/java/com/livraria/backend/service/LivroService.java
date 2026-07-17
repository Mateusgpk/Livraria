package com.livraria.backend.service;

import com.livraria.backend.model.Livro;
import com.livraria.backend.repository.LivroRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LivroService {
    private final LivroRepository repository;


    @Transactional
    public Livro addlivro(Livro livro){
        return repository.save(livro);
    }

}

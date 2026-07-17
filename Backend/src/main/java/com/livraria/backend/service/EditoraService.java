package com.livraria.backend.service;

import com.livraria.backend.model.Editora;
import com.livraria.backend.repository.EditoraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EditoraService {

    private final EditoraRepository repository;

    @Transactional(readOnly = true)
    public List<Editora> listarTodas() {
        return repository.findAll();
    }

    @Transactional
    public Editora salvar(Editora editora) {
        return repository.save(editora);
    }
}
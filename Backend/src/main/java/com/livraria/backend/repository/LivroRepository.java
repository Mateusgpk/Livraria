package com.livraria.backend.repository;


import com.livraria.backend.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    Optional<Livro> findById(Long aLong);
}

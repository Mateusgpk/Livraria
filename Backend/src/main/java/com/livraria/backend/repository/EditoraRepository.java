package com.livraria.backend.repository;

import com.livraria.backend.model.Editora;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EditoraRepository extends JpaRepository<Editora, Long> {

}

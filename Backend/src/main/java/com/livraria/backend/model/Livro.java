package com.livraria.backend.model;

import jakarta.persistence.*;
@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String titulo;
    private Double preco;

    @ManyToOne
    @JoinColumn(name="editora")
    private Editora editora;
}

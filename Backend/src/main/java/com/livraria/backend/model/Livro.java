package com.livraria.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titulo;

    @ManyToOne
    @JoinColumn(name="editora")
    private Editora editora;

    @OneToMany(mappedBy = "livro")
    private List<Exemplar> exemplares;
}

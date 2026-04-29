package com.livraria.backend.model;
import jakarta.persistence.*;

@Entity
public class Exemplar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="livro_id")
    private Livro livro;



}

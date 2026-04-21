package com.livraria.backend.model;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Editora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "editora")
    private List<Livro> livros;


}

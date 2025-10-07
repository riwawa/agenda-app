package io.github.dougllasfps.agenda.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 150, nullable = false)
    private String nome;
    @Column(length=150, nullable = false)
    private String email;
    @Column
    private Boolean favorito;

    @Column
    @Lob
    private byte[] foto;

    public static void main(String[] args) {
        Contato c = new Contato();
        c.setEmail("<EMAIL>");
    }


    public boolean isFavorito() {
        return favorito;
    }
}

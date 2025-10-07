package io.github.dougllasfps.agenda.model.repository;

import io.github.dougllasfps.agenda.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository <Contato, Integer>{
}

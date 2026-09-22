package com.fiap.ec.sprint_java.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.ec.sprint_java.model.Sala;

public interface SalaRepository extends JpaRepository<Sala, Long> {
}
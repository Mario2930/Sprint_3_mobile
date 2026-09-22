package com.fiap.ec.sprint_java.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.ec.sprint_java.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
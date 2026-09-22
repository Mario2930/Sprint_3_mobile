package com.fiap.ec.sprint_java.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.ec.sprint_java.model.Camera;

public interface CameraRepository extends JpaRepository<Camera, Long> {
}
package com.fiap.ec.sprint_java.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.sprint_java.model.Camera;
import com.fiap.ec.sprint_java.service.CameraService;

@RestController
@RequestMapping("/cameras")
@CrossOrigin
public class CameraController {

    private final CameraService service;

    public CameraController(CameraService service) {
        this.service = service;
    }

    @GetMapping
    public List<Camera> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Camera buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Camera criar(@RequestBody Camera camera) {
        return service.salvar(camera);
    }

    @PutMapping("/{id}")
    public Camera atualizar(@PathVariable Long id, @RequestBody Camera camera) {
        return service.atualizar(id, camera);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
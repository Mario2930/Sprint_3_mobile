package com.fiap.ec.sprint_java.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.sprint_java.model.Sala;
import com.fiap.ec.sprint_java.service.SalaService;

@RestController
@RequestMapping("/salas")
@CrossOrigin(origins = "*")
public class SalaController {

    private final SalaService service;

    public SalaController(SalaService service) {
        this.service = service;
    }

    @PostMapping
    public Sala criar(@RequestBody Sala sala) {
        return service.salvar(sala);
    }

    @GetMapping
    public List<Sala> listar() {
        return service.listar();
    }

    @PutMapping("/{id}")
    public Sala atualizar(@PathVariable Long id, @RequestBody Sala sala) {
        return service.atualizar(id, sala);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sala> buscarPorId(@PathVariable Long id) {
        // Agora usamos a variável 'service' que já existe na sua classe
        Sala sala = service.buscarPorId(id);
        
        if (sala != null) {
            return ResponseEntity.ok(sala); // Retorna 200 e os dados se achar
        }
        return ResponseEntity.notFound().build(); // Retorna 404 se não achar
    }
}
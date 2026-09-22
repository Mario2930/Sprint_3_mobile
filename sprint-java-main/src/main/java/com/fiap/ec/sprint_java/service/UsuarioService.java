package com.fiap.ec.sprint_java.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.sprint_java.model.Usuario;
import com.fiap.ec.sprint_java.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario salvar(Usuario usuario) {
        // Validação básica do nível de acesso
        if (usuario.getNivelAcesso() < 1 || usuario.getNivelAcesso() > 4) {
            throw new RuntimeException("Nível de acesso deve estar entre 1 e 4");
        }
        return repository.save(usuario);
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }
}
package com.fiap.ec.sprint_java.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.sprint_java.model.Sala;
import com.fiap.ec.sprint_java.repository.SalaRepository;

@Service
public class SalaService {

    private final SalaRepository repository;

    public SalaService(SalaRepository repository) {
        this.repository = repository;
    }

    public Sala salvar(Sala sala) {
        return repository.save(sala);
    }

    public List<Sala> listar() {
        return repository.findAll();
    }

    public Sala atualizar(Long id, Sala salaAtualizada) {
        Sala salaExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));
        
        salaExistente.setNome(salaAtualizada.getNome());
        salaExistente.setAcessoNecessario(salaAtualizada.getAcessoNecessario());
        salaExistente.setQtdPessoasComEpi(salaAtualizada.getQtdPessoasComEpi());
        salaExistente.setQtdPessoasSemEpi(salaAtualizada.getQtdPessoasSemEpi());
        
        return repository.save(salaExistente);
    }
    public Sala buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
}
package com.fiap.ec.sprint_java.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.sprint_java.model.Camera;
import com.fiap.ec.sprint_java.model.Sala;
import com.fiap.ec.sprint_java.repository.CameraRepository;
import com.fiap.ec.sprint_java.repository.SalaRepository;

@Service
public class CameraService {

    private final CameraRepository cameraRepository;
    private final SalaRepository salaRepository;

    public CameraService(CameraRepository cameraRepository, SalaRepository salaRepository) {
        this.cameraRepository = cameraRepository;
        this.salaRepository = salaRepository;
    }

    public Camera buscarPorId(Long id) {
        return cameraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Câmara não encontrada"));
    }

    public List<Camera> listar() {
        return cameraRepository.findAll();
    }

    public Camera salvar(Camera camera) {
        // Valida se a sala foi informada e se existe no banco de dados
        if (camera.getSala() == null || camera.getSala().getId() == null) {
            throw new RuntimeException("A câmara deve estar vinculada a uma sala válida.");
        }
        
        Sala sala = salaRepository.findById(camera.getSala().getId())
                .orElseThrow(() -> new RuntimeException("Sala associada não encontrada."));
        
        camera.setSala(sala);
        return cameraRepository.save(camera);
    }

    public Camera atualizar(Long id, Camera cameraAtualizada) {
        Camera cameraExistente = buscarPorId(id);
        
        cameraExistente.setNumero(cameraAtualizada.getNumero());
        
        if (cameraAtualizada.getSala() != null && cameraAtualizada.getSala().getId() != null) {
            Sala sala = salaRepository.findById(cameraAtualizada.getSala().getId())
                    .orElseThrow(() -> new RuntimeException("Sala associada não encontrada."));
            cameraExistente.setSala(sala);
        }
        
        return cameraRepository.save(cameraExistente);
    }

    public void deletar(Long id) {
        Camera camera = buscarPorId(id);
        cameraRepository.delete(camera);
    }
}
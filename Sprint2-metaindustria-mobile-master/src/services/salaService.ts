import { api } from './api';
import { Sala } from '../types/Sala';

export const salaService = {
  // Faz um GET para listar todas as salas
  listarSalas: async (): Promise<Sala[]> => {
    const response = await api.get('/salas'); // Altere '/salas' se o endpoint do seu backend for diferente
    return response.data;
  },

  // Faz um GET para buscar uma sala específica pelo ID
  buscarSalaPorId: async (id: number): Promise<Sala> => {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },

  // Faz um POST para criar uma nova sala (omitindo o ID, pois o backend vai gerar)
  criarSala: async (novaSala: Omit<Sala, 'id'>): Promise<Sala> => {
    const response = await api.post('/salas', novaSala);
    return response.data;
  }
};
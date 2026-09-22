import axios from 'axios';

// ATENÇÃO: Mude a BASE_URL de acordo com onde você está rodando o app:
// Emulador Android: http://10.0.2.2:8080
// Expo Go no Celular físico: http://SEU_IP_AQUI:8080 (ex: http://192.168.1.15:8080)
// Web / Emulador iOS: http://localhost:8080

const BASE_URL = 'http://localhost:8080'; // Configure conforme sua necessidade

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Dá erro se o backend demorar mais de 10 segundos para responder
  headers: {
    'Content-Type': 'application/json',
  },
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Sala } from '../types/Sala';
import { salaService } from '../services/salaService';

type Props = {
  salaId: number; // Agora recebe só o ID
  voltar: () => void;
};

export default function SalaDetalhe({ salaId, voltar }: Props) {
  const [sala, setSala] = useState<Sala | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarDetalhes();
  }, []);

  const carregarDetalhes = async () => {
    try {
      setIsLoading(true);
      const dados = await salaService.buscarSalaPorId(salaId);
      setSala(dados);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da sala.');
      voltar();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{marginTop: 10}}>Buscando detalhes...</Text>
      </View>
    );
  }

  if (!sala) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Sala</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID do Registo:</Text>
        <Text style={styles.valor}>{sala.id}</Text>

        <Text style={styles.label}>Nome da Sala:</Text>
        <Text style={styles.valor}>{sala.nome}</Text>

        <Text style={styles.label}>Nível de Acesso Exigido:</Text>
        <Text style={styles.valor}>{sala.acessoNecessario}</Text>

        <Text style={styles.label}>Trabalhadores com EPI:</Text>
        <Text style={styles.valorEpiCom}>{sala.qtdPessoasComEpi}</Text>

        <Text style={styles.label}>Trabalhadores sem EPI:</Text>
        <Text style={styles.valorEpiSem}>{sala.qtdPessoasSemEpi}</Text>
      </View>
      <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
        <Text style={styles.textoBotao}>Voltar para a Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centralizado: { justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3 },
  label: { fontSize: 14, color: '#666', marginTop: 10 },
  valor: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  valorEpiCom: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  valorEpiSem: { fontSize: 18, fontWeight: 'bold', color: '#F44336' },
  botaoVoltar: { marginTop: 30, backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
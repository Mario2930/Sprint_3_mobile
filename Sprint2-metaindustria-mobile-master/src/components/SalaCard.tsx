import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Sala } from '../types/Sala';

type SalaCardProps = {
  sala: Sala;
  onPress?: () => void;
};

export default function SalaCard({ sala, onPress }: SalaCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.titulo}>{sala.nome}</Text>
      <Text style={styles.texto}>Acesso Necessário: Nível {sala.acessoNecessario}</Text>
      <View style={styles.epiContainer}>
        <Text style={styles.epiCom}>Com EPI: {sala.qtdPessoasComEpi}</Text>
        <Text style={styles.epiSem}>Sem EPI: {sala.qtdPessoasSemEpi}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 8, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  texto: { fontSize: 14, color: '#666', marginTop: 4 },
  epiContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  epiCom: { color: '#4CAF50', fontWeight: 'bold' },
  epiSem: { color: '#F44336', fontWeight: 'bold' }
});
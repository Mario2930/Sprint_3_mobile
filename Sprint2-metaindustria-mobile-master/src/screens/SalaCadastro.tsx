import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Sala } from '../types/Sala';
import { salaService } from '../services/salaService';

type Props = {
  // Agora a função salvar não precisa mais receber a sala, o próprio componente vai salvar no backend
  aoSalvarComSucesso: () => void; 
  cancelar: () => void;
};

export default function SalaCadastro({ aoSalvarComSucesso, cancelar }: Props) {
  const [nome, setNome] = useState('');
  const [acesso, setAcesso] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome || !acesso) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Omitimos o ID, o backend irá gerá-lo
      const novaSala = {
        nome,
        acessoNecessario: parseInt(acesso, 10),
        qtdPessoasComEpi: 0,
        qtdPessoasSemEpi: 0,
      };
      
      await salaService.criarSala(novaSala);
      Alert.alert('Sucesso', 'Sala cadastrada com sucesso!');
      aoSalvarComSucesso(); // Volta para a lista
      
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registar Nova Sala</Text>

      <Text style={styles.label}>Nome do Setor/Sala</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Área de Fundição" />

      <Text style={styles.label}>Nível de Acesso (1 a 4)</Text>
      <TextInput style={styles.input} value={acesso} onChangeText={setAcesso} keyboardType="numeric" placeholder="Ex: 3" />

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginBottom: 20 }} />
      ) : (
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.textoBotao}>Guardar Registo</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.botaoCancelar} onPress={cancelar} disabled={isLoading}>
        <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, marginBottom: 5, color: '#555', fontWeight: '500' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  botaoSalvar: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botaoCancelar: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  textoBotaoCancelar: { color: '#666', fontSize: 16, fontWeight: 'bold' }
});
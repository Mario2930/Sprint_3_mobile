import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Sala } from './src/types/Sala';
import SalaCard from './src/components/SalaCard';
import SalaDetalhe from './src/screens/SalaDetalhe';
import SalaCadastro from './src/screens/SalaCadastro';
import { salaService } from './src/services/salaService';

export default function App() {
  // Inicializa a lista vazia ao invés de usar o mock
  const [salas, setSalas] = useState<Sala[]>([]);
  const [telaAtual, setTelaAtual] = useState<'lista' | 'cadastro' | 'detalhe'>('lista');
  
  // Agora guardamos o ID da sala para passar para o Detalhe
  const [salaSelecionadaId, setSalaSelecionadaId] = useState<number | null>(null);

  // Estados de controle da API
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as salas do Backend (Spring Boot)
  const carregarSalas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dados = await salaService.listarSalas();
      setSalas(dados);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar as salas. O Backend está rodando?');
    } finally {
      setIsLoading(false);
    }
  };

  // Toda vez que a tela atual for 'lista', ele recarrega os dados para trazer as novidades
  useEffect(() => {
    if (telaAtual === 'lista') {
      carregarSalas();
    }
  }, [telaAtual]);

  const abrirDetalhe = (id: number) => {
    setSalaSelecionadaId(id);
    setTelaAtual('detalhe');
  };

  const renderizarTela = () => {
    if (telaAtual === 'lista') {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Gestão de Acessos</Text>
            <TouchableOpacity style={styles.botaoNovo} onPress={() => setTelaAtual('cadastro')}>
              <Text style={styles.textoBotaoNovo}>+ Registar</Text>
            </TouchableOpacity>
          </View>

          {/* Estado: Carregando */}
          {isLoading && (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.textoMensagem}>Buscando salas...</Text>
            </View>
          )}

          {/* Estado: Erro de conexão com backend */}
          {error && !isLoading && (
            <View style={styles.centerBox}>
              <Text style={styles.textoErro}>{error}</Text>
              <TouchableOpacity style={styles.botaoTentarNovamente} onPress={carregarSalas}>
                <Text style={styles.textoBotaoNovo}>Tentar Novamente</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Estado: Sucesso (Mostra a lista) */}
          {!isLoading && !error && (
            <FlatList
              data={salas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <SalaCard sala={item} onPress={() => abrirDetalhe(item.id)} />}
              contentContainerStyle={styles.lista}
              ListEmptyComponent={<Text style={styles.textoMensagem}>Nenhuma sala cadastrada no banco.</Text>}
            />
          )}
        </View>
      );
    }

    if (telaAtual === 'detalhe' && salaSelecionadaId !== null) {
      // Passa apenas o ID para a tela de detalhe buscar no banco
      return <SalaDetalhe salaId={salaSelecionadaId} voltar={() => setTelaAtual('lista')} />;
    }

    if (telaAtual === 'cadastro') {
      // Quando salva com sucesso, volta pra lista (o useEffect cuidará de atualizar a tela)
      return <SalaCadastro aoSalvarComSucesso={() => setTelaAtual('lista')} cancelar={() => setTelaAtual('lista')} />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {renderizarTela()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1 },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff', 
    elevation: 3 
  },
  header: { 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  botaoNovo: { 
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 6 
  },
  textoBotaoNovo: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  lista: { padding: 15 },
  // Novos estilos para as mensagens e erros
  centerBox: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  textoMensagem: { 
    marginTop: 10, 
    fontSize: 16, 
    color: '#666' 
  },
  textoErro: { 
    fontSize: 16, 
    color: '#D32F2F', 
    textAlign: 'center', 
    marginBottom: 15 
  },
  botaoTentarNovamente: { 
    backgroundColor: '#D32F2F', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 6 
  }
});
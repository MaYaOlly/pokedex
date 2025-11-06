import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import PokemonService from '../model/services/pokemonService';
import { PokemonDetail } from '../model/entities/pokemon';
import PokemonCard from '../components/pokemonCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = new PokemonService();

  async function loadPokemons() {
    try {
      if (offset > 0) setLoadingMore(true);
      const listData = await service.list(offset, 20);
      const details = await Promise.all(
        listData.results.map(async (item) => await service.detail(item.url))
      );
      setPokemons((prev) => [...prev, ...details]);
      setOffset(offset + 20);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e3350d" />
        <Text>Carregando Pokémons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => navigation.navigate('Details', { pokemon: item })}
          />
        )}
        onEndReached={() => {
          if (!loadingMore) loadPokemons();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#999" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff20049', padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;

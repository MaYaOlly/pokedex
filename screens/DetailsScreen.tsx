import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsRouteProp;
}

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params;
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
      <Image source={{ uri: image ?? undefined }} style={styles.image} resizeMode="contain" />

      <View style={styles.infoBox}>
        <Text style={styles.label}>Altura: {pokemon.height / 10} m</Text>
        <Text style={styles.label}>Peso: {pokemon.weight / 10} kg</Text>
        <Text style={styles.label}>Tipos: {pokemon.types.map((t) => t.type.name).join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001182ff',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#001182ff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#eeff00ff',
    marginBottom: 8,
  },
});

export default DetailsScreen;

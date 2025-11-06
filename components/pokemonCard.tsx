import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PokemonDetail } from '../model/entities/pokemon';

interface Props {
  pokemon: PokemonDetail;
  onPress: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onPress }) => {
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image ?? undefined }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#a2c2e3ff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#001182ff',
  },
});

export default PokemonCard;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { PokemonDetail } from './model/entities/pokemon';

export type RootStackParamList = {
  Home: undefined;
  Details: { pokemon: PokemonDetail };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#001182ff' },
          headerTintColor: '#ffea00ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokédex' }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({ title: route.params.pokemon.name.toUpperCase() })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

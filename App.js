import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import MyFoodScreen from './screens/MyFoodScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { loadData, saveData } from './utils/storage';
import { StatusBar } from 'expo-status-bar';

export const AppContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const stored = await loadData('recipes');
      const fav = await loadData('favorites');
      if (stored) setRecipes(stored);
      else {
        // sample recipes
        const sample = require('./sample-recipes.json');
        setRecipes(sample);
        await saveData('recipes', sample);
        // set first sample as favorite for demo
        if (!fav && sample && sample.length>0) setFavorites([sample[0].id]);
      }
      if (fav) setFavorites(fav);
    })();
  }, []);

  useEffect(() => {
    saveData('recipes', recipes);
  }, [recipes]);

  useEffect(() => {
    saveData('favorites', favorites);
  }, [favorites]);

  const context = { recipes, setRecipes, favorites, setFavorites };

  return (
    <AppContext.Provider value={context}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="MyFood" component={MyFoodScreen} />
          <Stack.Screen name="EditRecipe" component={require('./screens/EditRecipeScreen').default} options={{ title: 'Edit Recipe' }} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </AppContext.Provider>
  );
}

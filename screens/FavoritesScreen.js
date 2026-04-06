import React, { useContext } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { AppContext } from '../App';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen({ navigation }){
  const { recipes, favorites, setFavorites } = useContext(AppContext);
  const data = recipes.filter(r=>favorites.includes(r.id));

  const toggleFav = (id) => {
    if (favorites.includes(id)) setFavorites(favorites.filter(f => f !== id));
    else setFavorites([...favorites, id]);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {data.length===0 && <Text style={{padding:12}}>No favorites yet.</Text>}
      <FlatList
        data={data}
        keyExtractor={i=>i.id}
        renderItem={({item})=> (
          <RecipeCard item={item} onPress={(it)=>navigation.navigate('Detail',{id:it.id})} favorite={favorites.includes(item.id)} onToggleFav={toggleFav} />
        )}
      />
    </SafeAreaView>
  );
}

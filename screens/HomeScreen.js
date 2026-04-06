import React, { useContext, useState } from 'react';
import { View, FlatList, SafeAreaView, Button } from 'react-native';
import CategoryBar from '../components/CategoryBar';
import RecipeCard from '../components/RecipeCard';
import { AppContext } from '../App';

const categories = [
  'All','Breakfast','Lunch','Dinner','Dessert','Snack','Salad','Pasta','Soup','Beverage','Vegan','Seafood','My Food'
];

export default function HomeScreen({ navigation }) {
  const { recipes, favorites, setFavorites } = useContext(AppContext);
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All' ? recipes : recipes.filter(r => r.category === selected || (selected==='My Food' && r.isMine));

  const toggleFav = (id) => {
    if (favorites.includes(id)) setFavorites(favorites.filter(f => f !== id));
    else setFavorites([...favorites, id]);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <CategoryBar categories={categories} selected={selected} onSelect={(c)=>{ setSelected(c); if(c==='Favorites') navigation.navigate('Favorites'); if(c==='My Food') navigation.navigate('MyFood');}} />
      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        renderItem={({item})=> (
          <RecipeCard item={item} onPress={(it)=>navigation.navigate('Detail',{id:it.id})} favorite={favorites.includes(item.id)} onToggleFav={toggleFav} />
        )}
      />
      <View style={{padding:8}}>
        <Button title="View Favorites" onPress={()=>navigation.navigate('Favorites')} />
      </View>
    </SafeAreaView>
  );
}

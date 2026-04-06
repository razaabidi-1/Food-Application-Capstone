import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { AppContext } from '../App';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { recipes, favorites, setFavorites } = useContext(AppContext);
  const item = recipes.find(r=>r.id===id) || {};

  const toggleFav = () => {
    if (favorites.includes(id)) setFavorites(favorites.filter(f=>f!==id));
    else setFavorites([...favorites, id]);
  };

  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{padding:12}}>
      <Button title="Back" onPress={()=>navigation.goBack()} />
      <Image source={{uri:item.image}} style={{width:'100%',height:220,marginTop:8}} />
      <View style={{marginTop:12}}>
        <Text style={{fontSize:22,fontWeight:'700'}}>{item.name}</Text>
        <Text style={{color:'#666',marginTop:6}}>{item.category} • {item.prepTime} • {item.servings} servings</Text>
        <Text style={{marginTop:8}}>Calories: {item.calories}</Text>
        <Text>Difficulty: {item.difficulty}</Text>
        <Button title={favorites.includes(id)?'Unfavorite':'Favorite'} onPress={toggleFav} />
        <Text style={{fontSize:18,fontWeight:'700',marginTop:12}}>Ingredients</Text>
        {item.ingredients && item.ingredients.map((ing,idx)=>(<Text key={idx}>- {ing}</Text>))}
        <Text style={{fontSize:18,fontWeight:'700',marginTop:12}}>Instructions</Text>
        <Text>{item.instructions}</Text>
      </View>
    </ScrollView>
  );
}

import React, { useContext } from 'react';
import { SafeAreaView, FlatList, Button, View, Text, Alert } from 'react-native';
import { AppContext } from '../App';
import RecipeCard from '../components/RecipeCard';

export default function MyFoodScreen({ navigation }){
  const { recipes, setRecipes, favorites, setFavorites } = useContext(AppContext);
  const mine = recipes.filter(r=>r.isMine);

  const handleDelete = (id) => {
    Alert.alert('Delete','Are you sure?',[
      {text:'Cancel',style:'cancel'},
      {text:'Delete',style:'destructive',onPress:()=>setRecipes(recipes.filter(r=>r.id!==id))}
    ]);
  };

  const toggleFav = (id) => {
    if (favorites.includes(id)) setFavorites(favorites.filter(f => f !== id));
    else setFavorites([...favorites, id]);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{padding:8}}>
        <Button title="Add New Recipe" onPress={()=>navigation.navigate('AddRecipe')} />
      </View>
      {mine.length===0 && <Text style={{padding:12}}>No personal recipes yet.</Text>}
      <FlatList
        data={mine}
        keyExtractor={i=>i.id}
        renderItem={({item})=> (
          <View>
            <RecipeCard item={item} onPress={(it)=>navigation.navigate('Detail',{id:it.id})} favorite={favorites.includes(item.id)} onToggleFav={toggleFav} />
            <View style={{flexDirection:'row',justifyContent:'space-around',padding:8}}>
              <Button title="Edit" onPress={()=>navigation.navigate('EditRecipe',{id:item.id})} />
              <Button title="Delete" color="red" onPress={()=>handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

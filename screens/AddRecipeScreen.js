import React, { useState, useContext } from 'react';
import { View, TextInput, Button, SafeAreaView, Text, ScrollView, Image } from 'react-native';
import { AppContext } from '../App';
import * as ImagePicker from 'expo-image-picker';

export default function AddRecipeScreen({ navigation }){
  const { recipes, setRecipes } = useContext(AppContext);
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://picsum.photos/400/300');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('My Food');

  const save = () => {
    const id = Date.now().toString();
    const newRecipe = {
      id,
      name,
      image,
      ingredients: ingredients.split('\n').map(s=>s.trim()).filter(Boolean),
      instructions,
      prepTime: 'N/A',
      servings: 1,
      calories: 0,
      difficulty: 'Unknown',
      category,
      isMine: true
    };
    setRecipes([newRecipe, ...recipes]);
    navigation.navigate('MyFood');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return alert('Permission denied');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.cancelled) setImage(result.uri);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle={{padding:12}}>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} style={{borderWidth:1,padding:8,marginBottom:8}} />
        <Text>Image</Text>
        {image ? <Image source={{uri:image}} style={{width:'100%',height:180,marginBottom:8}} /> : null}
        <Button title="Pick Image" onPress={pickImage} />
        <Text>Ingredients (one per line)</Text>
        <TextInput value={ingredients} onChangeText={setIngredients} multiline style={{borderWidth:1,padding:8,height:120,marginBottom:8}} />
        <Text>Instructions</Text>
        <TextInput value={instructions} onChangeText={setInstructions} multiline style={{borderWidth:1,padding:8,height:140,marginBottom:8}} />
        <Button title="Save Recipe" onPress={save} disabled={!name} />
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, SafeAreaView, Text, ScrollView, Image } from 'react-native';
import { AppContext } from '../App';
import * as ImagePicker from 'expo-image-picker';

export default function EditRecipeScreen({ route, navigation }){
  const { id } = route.params;
  const { recipes, setRecipes } = useContext(AppContext);
  const recipe = recipes.find(r=>r.id===id) || {};

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(()=>{
    if (recipe) {
      setName(recipe.name||'');
      setImage(recipe.image||'');
      setIngredients((recipe.ingredients||[]).join('\n'));
      setInstructions(recipe.instructions||'');
    }
  },[recipe]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return alert('Permission denied');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.cancelled) setImage(result.uri);
  };

  const save = () => {
    const updated = recipes.map(r=> r.id===id ? { ...r, name, image, ingredients: ingredients.split('\n').map(s=>s.trim()).filter(Boolean), instructions } : r);
    setRecipes(updated);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle={{padding:12}}>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} style={{borderWidth:1,padding:8,marginBottom:8}} />
        <Text>Image</Text>
        {image ? <Image source={{uri:image}} style={{width:'100%',height:180,marginBottom:8}} /> : null}
        <Button title="Pick Image" onPress={pickImage} />
        <Text style={{marginTop:8}}>Ingredients (one per line)</Text>
        <TextInput value={ingredients} onChangeText={setIngredients} multiline style={{borderWidth:1,padding:8,height:120,marginBottom:8}} />
        <Text>Instructions</Text>
        <TextInput value={instructions} onChangeText={setInstructions} multiline style={{borderWidth:1,padding:8,height:140,marginBottom:8}} />
        <Button title="Save Changes" onPress={save} disabled={!name} />
      </ScrollView>
    </SafeAreaView>
  );
}

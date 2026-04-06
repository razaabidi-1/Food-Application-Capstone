import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeCard = ({ item, onPress, favorite, onToggleFav }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity onPress={() => onToggleFav(item.id)}>
          <Text style={{ fontSize: 20 }}>{favorite ? '💖' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.meta}>{item.category} • {item.prepTime}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 160 },
  title: { fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, alignItems: 'center' },
  meta: { padding: 8, color: '#666' }
});

export default RecipeCard;

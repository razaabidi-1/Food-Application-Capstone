import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CategoryBar = ({ categories, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.item, selected === c && styles.selected]}
            onPress={() => onSelect(c)}
          >
            <Text style={styles.text}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginHorizontal: 6
  },
  selected: { backgroundColor: '#ffb703' },
  text: { fontWeight: '600' }
});

export default CategoryBar;

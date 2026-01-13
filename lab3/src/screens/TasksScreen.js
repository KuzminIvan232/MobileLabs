import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';

export default function TasksScreen() {
  const { tasks } = useGame();

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      <View style={styles.info}>
        <Text style={[styles.title, item.completed && styles.textCompleted]}>{item.title}</Text>
        <Text style={styles.progress}>
          Прогрес: {item.current} / {item.target}
        </Text>
      </View>
      <Ionicons
        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
        size={32}
        color={item.completed ? "#4caf50" : "#ccc"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  cardCompleted: { backgroundColor: '#e8f5e9', borderColor: '#c8e6c9' },
  title: { fontSize: 16, fontWeight: '600' },
  textCompleted: { textDecorationLine: 'line-through', color: '#888' },
  progress: { fontSize: 12, color: '#666', marginTop: 4 }
});
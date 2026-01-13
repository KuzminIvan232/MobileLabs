import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useGame } from '../context/GameContext';

export default function GameScreen() {
  const { score, addScore, triggerTask } = useGame();

  // Використовуємо стандартний Animated.Value замість useSharedValue
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Одинарний тап
  const singleTap = Gesture.Tap().onEnd(() => {
    addScore(1);
    triggerTask('tap');
  });

  // Подвійний тап
  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => {
    addScore(2);
    triggerTask('doubleTap');
  });

  // Довге натискання
  const longPress = Gesture.LongPress().minDuration(3000).onEnd(() => {
    addScore(10);
    triggerTask('longPress');
  });

  // Перетягування (Pan) через вбудований Animated
  const pan = Gesture.Pan().onUpdate((event) => {
    translationX.setValue(event.translationX);
    translationY.setValue(event.translationY);
  }).onEnd(() => {
    triggerTask('pan');
  });

  // Масштабування (Pinch)
  const pinch = Gesture.Pinch().onUpdate((event) => {
    scale.setValue(event.scale);
  }).onEnd(() => {
    triggerTask('pinch');
  });

  const composed = Gesture.Race(
    Gesture.Simultaneous(pan, pinch),
    Gesture.Race(doubleTap, longPress, singleTap)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Рахунок: {score}</Text>
      <GestureDetector gesture={composed}>
        <Animated.View style={[
          styles.box,
          { transform: [{ translateX: translationX }, { translateY: translationY }, { scale: scale }] }
        ]}>
          <Text style={styles.text}>КЛІК</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  score: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  box: { width: 120, height: 120, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  text: { color: 'white', fontWeight: 'bold' }
});
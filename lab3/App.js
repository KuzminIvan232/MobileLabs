import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameProvider } from './src/context/GameContext';
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Гра" component={GameScreen} />
            <Tab.Screen name="Завдання" component={TasksScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GameProvider>
    </GestureHandlerRootView>
  );
}
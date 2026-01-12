import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components/native'; // [cite: 119]
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from './src/theme/themes';

// Імпорт екранів
import StoreScreen from './src/screens/StoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';
// Для інших екранів зробіть заглушки поки що:
const PlaceholderScreen = () => <StoreScreen />;

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDark, setIsDark] = useState(true); // За замовчуванням темна (Steam)

  const toggleTheme = () => setIsDark(!isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: theme.header },
            headerTintColor: theme.text,
            tabBarStyle: { backgroundColor: theme.header },
            tabBarActiveTintColor: theme.accent,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Store') iconName = 'cart';
              else if (route.name === 'Community') iconName = 'people';
              else if (route.name === 'Chat') iconName = 'chatbubbles';
              else if (route.name === 'Safety') iconName = 'shield';
              else if (route.name === 'Profile') iconName = 'person';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Store" component={StoreScreen} />
          <Tab.Screen name="Community" component={PlaceholderScreen} />
          <Tab.Screen name="Chat" component={PlaceholderScreen} />
          <Tab.Screen name="Safety" component={PlaceholderScreen} />
          <Tab.Screen name="Profile">
            {props => <ProfileScreen {...props} toggleTheme={toggleTheme} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

// Горизонтальне меню (Tabs)
const TabsContainer = styled.ScrollView`
  flex-grow: 0;
  padding: 10px;
  background-color: ${props => props.theme.header};
`;

const TabButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${props => props.active ? props.theme.accent : 'transparent'};
  border-radius: 4px;
  margin-right: 10px;
`;

const TabText = styled.Text`
  color: ${props => props.active ? '#fff' : props.theme.text};
  font-weight: bold;
`;

// Картка новини
const NewsCard = styled.View`
  background-color: ${props => props.theme.cardBackground};
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
`;

const NewsImage = styled.View`
  height: 150px;
  background-color: #555;
  align-items: center;
  justify-content: center;
`;

const NewsContent = styled.View`
  padding: 10px;
`;

const NewsTitle = styled.Text`
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NewsDate = styled.Text`
  color: ${props => props.theme.secondaryText};
  font-size: 12px;
  margin-bottom: 10px;
`;

const NewsText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 14px;
`;

// Дані для списку
const newsData = [
  { id: '1', title: 'Оновлення Kingdom Come', date: 'Yesterday', text: 'Новий патч вже доступний...' },
  { id: '2', title: 'Знижки на вихідні', date: '2 days ago', text: 'Знижки до 90% на хіти...' },
  { id: '3', title: 'Counter-Strike 2 Update', date: 'Today', text: 'Виправлення багів та нові скіни.' },
];

export default function CommunityScreen() {
  return (
    <Container>
      {/* Горизонтальні вкладки */}
      <View style={{ height: 60 }}>
        <TabsContainer horizontal showsHorizontalScrollIndicator={false}>
            <TabButton active><TabText active>All</TabText></TabButton>
            <TabButton><TabText>Screenshots</TabText></TabButton>
            <TabButton><TabText>Artwork</TabText></TabButton>
            <TabButton><TabText>Videos</TabText></TabButton>
        </TabsContainer>
      </View>

      {/* Список новин */}
      <FlatList
        data={newsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NewsCard>
            <NewsImage>
                 <Ionicons name="image-outline" size={50} color="#ccc" />
            </NewsImage>
            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>{item.date}</NewsDate>
              <NewsText>{item.text}</NewsText>
            </NewsContent>
          </NewsCard>
        )}
      />
    </Container>
  );
}

import { View } from 'react-native'; // Додаємо імпорт View
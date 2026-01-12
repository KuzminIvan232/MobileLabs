import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

// Стилізовані компоненти [cite: 119]
const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  padding: 10px;
`;

const GameCard = styled.View`
  background-color: ${props => props.theme.cardBackground};
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
`;

const GameTitle = styled.Text`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: bold;
`;

const GamePrice = styled.Text`
  color: ${props => props.theme.accent};
  margin-top: 5px;
`;

// Дані (імітація)
const initialGames = [
  { id: '1', title: 'Dead by Daylight', price: '$18' },
  { id: '2', title: 'GTA V', price: '$20' },
  { id: '3', title: 'Factorio', price: '$7' },
];

export default function StoreScreen() {
  const [games, setGames] = useState(initialGames);

  // Імітація Infinite Scroll [cite: 125]
  const loadMoreGames = () => {
    const moreGames = [
      { id: Math.random().toString(), title: 'New Game', price: '$10' },
      { id: Math.random().toString(), title: 'Another Game', price: '$25' }
    ];
    setGames([...games, ...moreGames]);
  };

  return (
    <Container>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard>
            <GameTitle>{item.title}</GameTitle>
            <GamePrice>{item.price}</GamePrice>
          </GameCard>
        )}
        onEndReached={loadMoreGames}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
}
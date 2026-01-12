import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.cardBackground};
  align-items: center;
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  background-color: #444;
  border-radius: 25px;
  margin-right: 15px;
  position: relative;
`;

// Індикатор статусу (зелений/синій кружечок)
const StatusIndicator = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.online ? '#4cff00' : '#66c0f4'};
  position: absolute;
  bottom: 0;
  right: 0;
  border-width: 2px;
  border-color: ${props => props.theme.background};
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  color: ${props => props.theme.accent};
  font-weight: bold;
  font-size: 16px;
`;

const LastMessage = styled.Text`
  color: ${props => props.theme.secondaryText};
  font-size: 13px;
  margin-top: 3px;
`;

const friendsData = [
  { id: '1', name: 'Mark Dyson', status: 'Playing CS2', online: true },
  { id: '2', name: 'Player123', status: 'Online', online: false }, // blue (online but not in game)
  { id: '3', name: 'Ivan', status: 'Last seen 2h ago', online: false },
];

export default function ChatScreen() {
  return (
    <Container>
      <FlatList
        data={friendsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatItem>
            <Avatar>
                <StatusIndicator online={item.online} />
            </Avatar>
            <ChatInfo>
              <Name>{item.name}</Name>
              <LastMessage>{item.status}</LastMessage>
            </ChatInfo>
          </ChatItem>
        )}
      />
    </Container>
  );
}
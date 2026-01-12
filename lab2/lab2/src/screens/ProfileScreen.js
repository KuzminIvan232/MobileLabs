import React from 'react';
import styled from 'styled-components/native';
import { Button, Image } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-items: center;
  justify-content: center;
`;

const UserName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 22px;
  margin-bottom: 20px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.accent};
  border-radius: 50px;
  margin-bottom: 20px;
`;

export default function ProfileScreen({ toggleTheme }) {
  return (
    <Container>
      <Avatar />
      <UserName>Firstname Lastname</UserName>
      <Button title="Змінити тему" onPress={toggleTheme} />
    </Container>
  );
}
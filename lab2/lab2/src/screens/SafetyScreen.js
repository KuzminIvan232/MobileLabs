import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-items: center;
  padding-top: 50px;
`;

const GuardCodeContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const GuardTitle = styled.Text`
  color: ${props => props.theme.secondaryText};
  font-size: 14px;
  margin-bottom: 10px;
`;

const CodeText = styled.Text`
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 5px;
`;

// Прогрес-бар (смужка часу дії коду)
const ProgressBar = styled.View`
  width: 200px;
  height: 4px;
  background-color: ${props => props.theme.accent};
  margin-top: 10px;
  border-radius: 2px;
`;

const InfoText = styled.Text`
  color: ${props => props.theme.text};
  text-align: center;
  padding: 0 30px;
  margin-bottom: 40px;
  line-height: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 90%;
  padding: 15px;
  background-color: ${props => props.theme.cardBackground};
  margin-bottom: 10px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const ActionText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 16px;
`;

export default function SafetyScreen() {
  return (
    <Container>
      <GuardCodeContainer>
        <GuardTitle>Logged in as player</GuardTitle>
        <CodeText>N5KCV</CodeText>
        <ProgressBar />
      </GuardCodeContainer>

      <InfoText>
        You'll enter your code each time you enter your password to sign in to your Steam account.
      </InfoText>

      <ActionButton>
        <ActionText>Remove Authenticator</ActionText>
      </ActionButton>

      <ActionButton>
        <ActionText>My Recovery Code</ActionText>
      </ActionButton>
    </Container>
  );
}
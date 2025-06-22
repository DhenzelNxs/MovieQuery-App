import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ecdec3;
    padding: 16px;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #784831;
    margin-left: 10px;
`;

export const Card = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  align-items: center;
`;

export const Poster = styled.Image`
  width: 80px;
  height: 120px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
`;

export const MovieTitle = styled.Text`
  color: #784831;
  font-size: 16px;
  font-weight: bold;
`;

export const MovieDate = styled.Text`
  color: #a0937d;
  font-size: 14px;
  margin-top: 4px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 10px;
`;
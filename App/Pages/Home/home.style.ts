import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ECDEC3;
`;

export const SearchMovieInput = styled.TextInput`
    background-color: #FFFFFF;
    padding: 12px;
    margin: 16px;
    border-radius: 8px;
    font-size: 16px;
    color: #000;
`;


export const Card = styled.View`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  elevation: 12;
`;

export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;

export const CardOverlay = styled.View`
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const CardTitle = styled.Text`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const TrailerButton = styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.75);
    padding: 12px 16px;
    border-radius: 50px;
    flex-direction: row;
    align-items: center;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.3;
    shadow-radius: 6px;
    elevation: 5;
`;

export const TrailerText = styled.Text`
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    margin-left: 8px;
`;

export const SmallCard = styled.TouchableOpacity`
  width: 120px;
  height: 180px;
  margin-right: 12px;
  border-radius: 6px;
  border: 1px solid #ccc; 
  overflow: hidden;
  background-color: #000;
`;

export const SmallCardImage = styled.Image`
  width: 100%;
  height: 140px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const SmallCardTitle = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-top: 6px;
  margin-horizontal: 6px;
  max-width: 120px;
  text-align: center;
`;
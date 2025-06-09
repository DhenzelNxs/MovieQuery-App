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

export const CarouselContainer = styled.View`

`

export const Card = styled.View`
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
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

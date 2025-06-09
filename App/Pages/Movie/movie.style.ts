import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ECDEC3;
`;

export const MovieTitle = styled.Text`
    padding-left: 18px;
    padding-top: 14px;
    font-size: 35px;
    color: #784831;
`
export const MovieTimeYear = styled.Text`
    padding-left: 18px;
    padding-bottom: 6px;
    font-size: 18px;
`

export const MovieBackdrop = styled.View`
    width: 100%;
    height: 250px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    margin-top: 20px;
    padding: 0 20px; 
`;


export const MoviePosterImage = styled.Image`
    width: 100%;
    height: 90%;
    border-radius: 16px;
    background-color: #000;
    align-self: center;
    elevation: 12;
`;

export const PlayMovieTrailerButton = styled.TouchableOpacity`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-10px, -40px); 
    z-index: 10;
`;

export const TrailerButton = styled.TouchableOpacity`
    position: absolute;
    top: 8px;
    left: 30px;
    width: 200px;
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

export const VideoWrapper = styled.View`
  flex: 1;                
  border-radius: 16px;
  overflow: hidden;      
`;

export const MovieDescriptionContainer = styled.View`
    flex-direction: column;
    padding: 16px 18px;
    gap: 16px;
    align-items: center;
    background-color: #784831;
    border-radius: 16px;
    margin: 8px 18px;
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
`;

export const MovieDescriptionPoster = styled.Image`
    width: 120px;
    height: 180px;
    border-radius: 12px;
    background-color: #eee;
    elevation: 6;
`;

export const MovieDescription = styled.Text`
    font-size: 16px;
    color: #ECDEC3;
    line-height: 22px;
    text-align: justify;
`;

export const SearchListContainer = styled.View`
    background-color: #ecdec3;
    border-radius: 12px;
    margin: 10px 16px 0 16px;
    elevation: 4;
`;

export const SearchListItem = styled.TouchableOpacity`
    padding: 12px 16px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(120, 72, 49, 0.2);
`;

export const SearchListText = styled.Text`
    color: #784831;
    font-size: 16px;
    font-weight: 500;
`;


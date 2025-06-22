import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: #ECDEC3;
    position: relative;
`;

export const LoginContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const AppLogoContainer = styled.View`
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
`;

export const AppLogo = styled(Image).attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: 100%;
`;

export const InfoText = styled.Text`
    font-size: 16px;
    color: #784831;
    margin-bottom: 24px;
    text-align: center;
`;

export const TmdbButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    background-color: white;
    padding: 12px 20px;
    border-radius: 8px;
    elevation: 3;
`;

export const TmdbButtonText = styled.Text`
    font-size: 16px;
    color: #784831;
    margin-left: 12px;
    font-weight: bold;
`;

export const TmdbLogo = styled(Image)`
    width: 60px;
    height: 35px;
`;

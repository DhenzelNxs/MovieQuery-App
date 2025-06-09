import styled, { css } from 'styled-components/native';
import { HeaderProps } from './Header';

export const Container = styled.View<Pick<HeaderProps, 'backgroundColor' | 'height'>>`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: relative; 

    ${({ height }) => css`
        height: ${height ?? 56}px;
    `}

    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor ?? '#fff'};
    `}
`;

export const Title = styled.Text<Pick<HeaderProps, 'color'>>`
    font-size: 18px;
    font-weight: 600;

    ${({ color }) => css`
        color: ${color ?? '#000'};
    `}
`;

export const TitleContainer = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;



export const IconButton = styled.TouchableOpacity`
    padding: 10px;
`;

export const ProfileIconButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border: 1px solid #BDB29C;
    border-radius: 24px;
`;

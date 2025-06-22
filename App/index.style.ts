import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ECDEC3;
`;

export const ToastContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #ECDEC3;
    border-left-color: #784831;
    border-left-width: 5px;
    padding: 12px 16px;
    border-radius: 10px;
    margin: 0 10px;

    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 8px;
    shadow-offset: 0px 2px;
    elevation: 5;
`;

export const IconContainer = styled.View`
  margin-right: 12px;
`;

export const TextContent = styled.View`
  flex: 1;
`;

export const ToastTitle = styled.Text`
    color: #784831;
    font-weight: bold;
    font-size: 16px;
`;

export const ToastMessage = styled.Text`
    color: #784831;
    font-size: 14px;
    margin-top: 4px;
`;

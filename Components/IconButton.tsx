import React from "react";
import styled from "styled-components/native";

interface IconButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: any;
}

const StyledTouchable = styled.TouchableOpacity`
  padding-right: 8px;
`;

export default function IconButton({ children, onPress, style }: IconButtonProps) {
    return (
        <StyledTouchable activeOpacity={0.8} onPress={onPress} style={style}>
            {children}
        </StyledTouchable>
    );
}

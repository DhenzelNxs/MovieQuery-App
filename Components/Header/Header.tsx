import React from 'react';
import { GestureResponderEvent } from 'react-native';
import {Container, IconButton, ProfileIconButton, Title, TitleContainer} from "./header.style";
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export interface HeaderProps {
    title?: string;
    leftIcon?: string;
    onLeftPress?: (e: GestureResponderEvent) => void;
    rightIcon?: string;
    onRightPress?: (e: GestureResponderEvent) => void;
    height?: number;
    backgroundColor?: string;
    color?: string;
    titleLeftIcon?: string;
}

export default function Header({
   title,
   leftIcon,
   rightIcon,
   onLeftPress,
   onRightPress,
   height,
   backgroundColor,
   color,
   titleLeftIcon
}: HeaderProps) {
    return (
        <Container height={height} backgroundColor={backgroundColor}>
            {leftIcon ? (
                <IconButton onPress={onLeftPress}>
                    <Icon name={leftIcon} size={24} color={color ?? '#000'} />
                </IconButton>
            ) : (
                <IconButton disabled>
                    <Icon name="square" size={24} color="transparent" />
                </IconButton>
            )}

            {title && (
                <TitleContainer>
                    {titleLeftIcon &&  <Icon name={titleLeftIcon} size={24} color={color}/>}
                    <Title color={color}>{title}</Title>
                </TitleContainer>
            )}

            {rightIcon ? (
                <ProfileIconButton onPress={onRightPress}>
                    <FontAwesomeIcon name={rightIcon} size={24} color={color ?? '#000'} />
                </ProfileIconButton>
            ) : (
                <ProfileIconButton disabled>
                    <Icon name="square" size={24} color="transparent" />
                </ProfileIconButton>
            )}
        </Container>
    );
}

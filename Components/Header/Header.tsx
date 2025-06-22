import React, { useState } from 'react';
import { GestureResponderEvent, Image } from 'react-native';
import {
    Container,
    IconButton,
    ProfileIconButton,
    Title,
    TitleContainer,
} from './header.style';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useUserStore } from '../../Storage/User/useUser';
import { Menu, Divider } from 'react-native-paper';

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
   titleLeftIcon,
}: HeaderProps) {
    const { user, logout } = useUserStore((state) => state);
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleProfile = () => {
        closeMenu();
        onRightPress?.({} as GestureResponderEvent);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
    };

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
                    {titleLeftIcon && <Icon name={titleLeftIcon} size={24} color={color} />}
                    <Title color={color}>{title}</Title>
                </TitleContainer>
            )}

            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                    <ProfileIconButton onPress={openMenu}>
                        {user?.avatar?.gravatar?.hash ? (
                            <Image
                                source={{ uri: `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}` }}
                                style={{ width: 32, height: 32, borderRadius: 16 }}
                            />
                        ) : (
                            <FontAwesomeIcon name={rightIcon} size={24} color={color ?? '#000'} />
                        )}
                    </ProfileIconButton>
                }
                contentStyle={{ backgroundColor: '#ECDEC3' }}
            >
                <Menu.Item
                    onPress={handleProfile}
                    title="Perfil"
                    leadingIcon="account"
                    //@ts-ignore
                    iconColor="#784831"
                    titleStyle={{ color: '#784831' }}
                />
                <Divider />
                <Menu.Item
                    onPress={handleLogout}
                    title="Sair"
                    leadingIcon="logout"
                    //@ts-ignore
                    iconColor="#784831"
                    titleStyle={{ color: '#784831' }}
                />
            </Menu>
        </Container>
    );
}

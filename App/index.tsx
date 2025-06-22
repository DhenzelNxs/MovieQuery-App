import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, {BaseToastProps} from 'react-native-toast-message';

import Header from '../Components/Header/Header';
import HomeStack from "../Routes/Home.routes";
import Favorites from "./Pages/Favorites";
import {TabBarIcons} from "../Components/TabIcons/TabIcons";
import AnimatedTabIcon from "../Components/AnimatedTabIcon/AnimatedTabIcon";
import {IconContainer, TextContent, ToastContainer, ToastMessage, ToastTitle} from "./index.style";
import { Feather } from '@expo/vector-icons';

export type RootStackParamList = {
    Home: undefined;
    Movie: { id?: string; type?: 'movie' | 'serie' };
};

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export const toastConfig = {
    success: (props: BaseToastProps) => (
        <ToastContainer>
            <IconContainer>
                <Feather name="bookmark" size={24} color="#784831" />
            </IconContainer>
            <TextContent>
                <ToastTitle>{props.text1}</ToastTitle>
                {props.text2 ? <ToastMessage>{props.text2}</ToastMessage> : null}
            </TextContent>
        </ToastContainer>
    ),
};

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar barStyle="light-content" backgroundColor="#000" />
                    <SafeAreaView style={{ flex: 1 }}>
                        <Header
                            title="MovieQuery"
                            backgroundColor="#000"
                            leftIcon="menu"
                            color="#BDB29C"
                            rightIcon="user"
                            titleLeftIcon="search"
                        />

                        <Tab.Navigator
                            screenOptions={({ route }) => ({
                                headerShown: false,
                                tabBarStyle: { backgroundColor: '#000', borderTopColor: '#222' },
                                tabBarActiveTintColor: '#BDB29C',
                                tabBarInactiveTintColor: '#666',
                                tabBarIcon: ({ focused, color, size }) => (
                                    <AnimatedTabIcon
                                        key={route.name}
                                        focused={focused}
                                        iconName={TabBarIcons[route.name]?.iconName}
                                        size={size}
                                        color={color}
                                    />
                                ),
                            })}
                            id={undefined}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomeStack}
                                options={{
                                    title: 'Início',
                                }}
                            />

                            <Tab.Screen
                                name="Favorites"
                                component={Favorites}
                                options={{ title:
                                        'Favoritos'
                                }}
                            />
                        </Tab.Navigator>
                    </SafeAreaView>
                </NavigationContainer>
            </SafeAreaProvider>
            <Toast config={toastConfig} visibilityTime={4000} swipeable={true}/>
        </QueryClientProvider>
    );
}

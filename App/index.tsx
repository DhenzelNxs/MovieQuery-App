import React from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, {BaseToastProps} from 'react-native-toast-message';

import {IconContainer, TextContent, ToastContainer, ToastMessage, ToastTitle} from "./index.style";
import { Feather } from '@expo/vector-icons';
import AppRoutes from "../Routes/App.routes";
import AuthRoutes from "../Routes/Auth.routes";
import {useUserStore} from "../Storage/User/useUser";
import {PaperProvider} from "react-native-paper";

export type RootStackParamList = {
    Home: undefined;
    Movie: { id?: string; type?: 'movie' | 'serie' };
};

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
    const { user } = useUserStore((state) => state)

    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <PaperProvider>
                        <StatusBar barStyle="light-content" backgroundColor="#000" />
                        <SafeAreaView style={{ flex: 1 }}>
                            {
                                user ? <AppRoutes /> : <AuthRoutes />
                            }
                        </SafeAreaView>
                    </PaperProvider>
                </NavigationContainer>
            </SafeAreaProvider>
            <Toast config={toastConfig} visibilityTime={4000} swipeable={true}/>
        </QueryClientProvider>
    );
}

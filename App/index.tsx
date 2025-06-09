import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './Pages/Home';
import Movie from "./Pages/Movie";
import {Container} from "./index.style";

export type RootStackParamList = {
    Home: undefined;
    Movie: { id?: string, type?: 'movie' | 'serie' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar backgroundColor={'#000'} />
                    <Container>
                        <Stack.Navigator
                            initialRouteName="Home"
                            screenOptions={{
                                headerShown: false,
                                animation: 'slide_from_right',
                                animationDuration: 300,
                            }}
                            id={undefined}
                        >
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Movie" component={Movie} />
                        </Stack.Navigator>
                    </Container>
                </SafeAreaView>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

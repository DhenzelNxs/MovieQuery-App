import {Container} from "../App/index.style";
import Home from "../App/Pages/Home";
import Movie from "../App/Pages/Movie";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
    return (
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
    )
}
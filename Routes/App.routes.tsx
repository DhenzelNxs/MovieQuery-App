import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Header from "../Components/Header/Header";
import AnimatedTabIcon from "../Components/AnimatedTabIcon/AnimatedTabIcon";
import {TabBarIcons} from "../Components/TabIcons/TabIcons";
import HomeStack from "./Home.routes";
import Favorites from "../App/Pages/Favorites";
import React from "react";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <>
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
        </>
    )
}
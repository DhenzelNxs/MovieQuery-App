import React from 'react';
import { Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MotiView } from 'moti';

type AnimatedTabIconProps = {
    focused: boolean;
    iconName: string;
    size: number;
    color: string;
};

export default function AnimatedTabIcon({ focused, iconName, size, color }: AnimatedTabIconProps) {
    return (
        <MotiView
            animate={{
                translateY: focused ? -6 : 0,
                shadowOpacity: focused ? 0.3 : 0,
                //@ts-ignore
                elevation: Platform.OS === 'android' ? (focused ? 10 : 0) : undefined,
            }}
            transition={{
                type: 'timing',
                duration: 300,
            }}
            style={{
                borderRadius: 30,
                backgroundColor: focused ? '#111' : 'transparent',
                shadowColor: '#BDB29C',
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 6,
            }}
        >
            <Feather name={iconName} size={size} color={color} />
        </MotiView>
    );
}

import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const RatingProgress = ({ value, max }: { value: number; max: number }) => {
    const percentage = (value / max) * 100;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedCircularProgress
                size={120}
                width={10}
                fill={percentage}
                tintColor="#C8AE3A"
                backgroundColor="#eee"
                rotation={0}
                duration={800}
                lineCap="round"
            >
                {() => (
                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#C8AE3A' }}>
                        {value.toFixed(1)}
                    </Text>
                )}
            </AnimatedCircularProgress>
        </View>
    );
};

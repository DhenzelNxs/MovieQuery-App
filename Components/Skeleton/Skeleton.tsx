import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SkeletonContainer = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: #ccc;
    overflow: hidden;
    margin-right: 12px;
`;

const AnimatedGradient = styled(MotiView)`
`;

export const Skeleton = () => {
    return (
        <SkeletonContainer>
            <AnimatedGradient
                from={{ translateX: -width }}
                animate={{ translateX: width }}
                transition={{
                    loop: true,
                    repeatReverse: false,
                    type: 'timing',
                    duration: 1400,
                }}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{ width: '100%', height: '100%' }}
                />
            </AnimatedGradient>
        </SkeletonContainer>
    );
};

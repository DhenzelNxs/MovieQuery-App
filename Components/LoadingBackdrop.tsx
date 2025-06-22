import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface LoadingBackdropProps {
    visible: boolean;
    text?: string;
    color?: string;
    backgroundColor?: string;
}

export function LoadingBackdrop({
    visible,
    text = 'Carregando...',
    color = '#784831',
    backgroundColor = 'rgba(236, 222, 195, 0.85)',
}: LoadingBackdropProps) {
    if (!visible) return null;

    return (
        <View style={[styles.loadingBackdrop, { backgroundColor }]}>
            <View style={[styles.loadingBox, { backgroundColor: color }]}>
                <ActivityIndicator size="large" color="#ECDEC3" />
                <Text style={styles.loadingText}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingBackdrop: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingBox: {
        padding: 24,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    loadingText: {
        color: '#ECDEC3',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
});

import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import type { NavigationProp } from '@react-navigation/native';

interface BackButtonProps {
    navigation: NavigationProp<any>;
}

export const BackButton: React.FC<BackButtonProps> = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.button}
                activeOpacity={0.7}
            >
                <Feather name="arrow-left" size={18} color="#4A3C1A" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingLeft: 18,
        width: 100,
        marginTop: 10
    },
    button: {
        backgroundColor: '#ECDEC3',
        height: 36,
        padding: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ECDEC3',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1.5,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

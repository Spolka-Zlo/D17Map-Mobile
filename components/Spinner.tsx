import Colors from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type SpinnerProps = {
    isLoading: boolean;
};

export const Spinner = (props: SpinnerProps) => {
    if (!props.isLoading) return null;

    return (
        <View style={styles.container} pointerEvents="none">
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(128, 128, 128, 0.7)',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
});
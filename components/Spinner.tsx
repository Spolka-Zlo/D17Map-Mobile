import Colors from '@/constants/Colors'
import React from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'

type SpinnerProps = {
    isLoading: boolean
    text?: string
}

export const Spinner = ({ isLoading, text }: SpinnerProps) => {
    if (!isLoading) return null

    return (
        <View style={styles.container} pointerEvents="none">
            <ActivityIndicator size="large" color={Colors.primary} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    )
}

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
    },
    text: {
        marginTop: 10,
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

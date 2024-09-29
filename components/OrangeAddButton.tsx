import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const buttonSize = 80; // Stała rozmiaru przycisku
const lineThickness = 8; // Grubość linii plusa
const lineLength = buttonSize / 2; // Długość linii plusa

type AddButtonProps = {
    onPress: () => void
}

export function OrangeAddButton({ onPress }: AddButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.plusContainer}>
                <View style={[styles.line, styles.horizontalLine]} />
                <View style={[styles.line, styles.verticalLine]} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: Colors.secondary,
        borderRadius: buttonSize / 2, 
        width: buttonSize, 
        height: buttonSize,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    plusContainer: {
        position: 'relative',
        width: lineLength,
        height: lineLength,
    },
    line: {
        position: 'absolute',
        backgroundColor: Colors.white,
        width: lineThickness,
        height: lineLength,
    },
    horizontalLine: {
        left: '90%',
        marginLeft: -lineLength / 2,
        transform: [{ rotate: '0deg' }],
    },
    verticalLine: {
        top: '50%',
        left: '50%',
        marginTop: -lineLength / 2,
        marginLeft: -lineThickness / 2,
        transform: [{ rotate: '90deg' }],
    },
});

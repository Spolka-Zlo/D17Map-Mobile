import Colors from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TextStyle } from 'react-native'

const buttonSize = 80; // Stała rozmiaru przycisku
type AddButtonProps = {
    onPress: () => void
}

export function OrangeAddButton({ onPress }: AddButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome name="plus" size={buttonSize/2} color={Colors.white} style={styles.plusIcon} />
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
        // borderColor: Colors.primary,
        // borderWidth: 5,
    },
    plusIcon: {
        marginLeft: 2,
    },
});
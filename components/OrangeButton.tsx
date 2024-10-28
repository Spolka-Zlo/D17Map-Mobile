import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TextStyle } from 'react-native'

type ButtonProps = {
    text: string
    textClassName?: TextStyle
    onPress: () => void
    buttonStyle?: TextStyle
}

export function OrangeButton({ text, textClassName, onPress, buttonStyle }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.buttonText, textClassName]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
    },
})

import Colors from '@/constants/Colors'
import React from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TextStyle,
} from 'react-native'

type ListElementProps = {
    text: string
    onPress?: () => void
    buttonStyle?: TextStyle
    textStyle?: TextStyle
}

export default function ListElement({
    text,
    onPress,
    buttonStyle,
    textStyle,
}: ListElementProps) {
    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer,
                onPress && styles.pointerCursor,
                buttonStyle,
            ]}
            onPress={onPress}
        >
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 16,
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        shadowColor: Colors.primary,
    },
    pointerCursor: {
        shadowColor: Colors.primary,
    },
    textStyle: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '800',
        textAlign: 'center',
    },
})

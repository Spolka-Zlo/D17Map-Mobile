import Colors from '@/constants/Colors'
import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons' // Dodano ikonę strzałki

type ListElementProps = {
    text: string
    onPress?: () => void
    buttonStyle?: ViewStyle
    textStyle?: TextStyle
    backgroundColor?: string
    isRecurring?: boolean
}

export default function ListElement({
    text,
    onPress,
    buttonStyle,
    textStyle,
    backgroundColor = Colors.primary,
    isRecurring = false,
}: ListElementProps) {
    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer,
                onPress && styles.pointerCursor,
                { backgroundColor },
                buttonStyle,
            ]}
            onPress={onPress}
        >
            <View style={styles.contentContainer}>
                <Text style={[styles.textStyle, textStyle]}>{text}</Text>
                {isRecurring && (
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={26}
                        color={Colors.white}
                        style={styles.icon}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 16,
        justifyContent: 'center',
        borderRadius: 8,
        shadowColor: Colors.primary,
        width: '100%',
    },
    pointerCursor: {
        shadowColor: Colors.primary,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '800',
        textAlign: 'center',
        flex: 1,
    },
    icon: {
        marginLeft: 8,
    },
})
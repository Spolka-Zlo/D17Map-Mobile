import Colors from '@/constants/Colors'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { TextStyle } from 'react-native'

type ButtonProps = {
    text: string
    textClassName?: TextStyle
    onPress: () => void
    buttonStyle?: ViewStyle
    disabled?: boolean
}

export function OrangeButton({
    text,
    textClassName,
    onPress,
    buttonStyle,
    disabled = false,
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                buttonStyle,
                disabled && styles.buttonDisabled,
            ]}
            onPress={!disabled ? onPress : undefined}
            activeOpacity={disabled ? 1 : 0.7}
        >
            <Text
                style={[
                    styles.buttonText,
                    textClassName,
                    disabled && styles.textDisabled,
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
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
    buttonDisabled: {
        backgroundColor: 'grey',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
    },
    textDisabled: {
        color: 'black',
    },
});

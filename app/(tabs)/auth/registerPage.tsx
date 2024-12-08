import { OrangeButton } from '@/components/OrangeButton'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { 
    Keyboard, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback, 
    View 
} from 'react-native'

export default function RegisterScreen() {
    const { onRegister } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const passwordInputRef = useRef<TextInput>(null)
    const confirmPasswordInputRef = useRef<TextInput>(null)

    const handleRegister = async () => {
        Keyboard.dismiss()
        if (password !== confirmPassword) {
            setError('Hasła nie zgadzają się.')
            return
        }
        try {
            const response = await onRegister(username, password)
            if (response) {
                console.log('Registration successful')
                router.push('/auth/loginPage')
            } else {
                setError('Błąd podczas rejestracji. Spróbuj ponownie.')
            }
        } catch {
            setError('Błąd podczas rejestracji. Spróbuj ponownie.')
        }
    }

    const handleLoginButton = () => {
        Keyboard.dismiss() 
        router.push('/auth/loginPage')
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.registerContainer}>
                        <TextInput
                            style={styles.placeholder}
                            placeholder="Nazwa użytkownika"
                            value={username}
                            onChangeText={setUsername}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            ref={passwordInputRef}
                            style={styles.placeholder}
                            placeholder="Hasło"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="next" 
                            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            ref={confirmPasswordInputRef}
                            style={styles.placeholder}
                            placeholder="Potwierdź hasło"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            returnKeyType="done"
                            onSubmitEditing={handleRegister} 
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <OrangeButton
                            text="ZAREJESTRUJ SIĘ"
                            onPress={handleRegister}
                            textClassName={styles.textClassName}
                        />
                        <Text style={styles.loginText}>
                            Masz już konto? Zaloguj się!
                        </Text>
                        <OrangeButton
                            text="ZALOGUJ SIĘ"
                            onPress={handleLoginButton}
                            textClassName={styles.textClassName}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mapGrey,
    },
    registerContainer: {
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 10,
    },
    placeholder: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 20,
        height: 69,
        width: 277,
        padding: 20,
        fontSize: 18,
    },
    textClassName: {
        padding: 8,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: -20,
        marginBottom: 10,
        maxWidth: 277,
    },
    loginText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
})

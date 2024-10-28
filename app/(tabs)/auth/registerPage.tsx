import { OrangeButton } from '@/components/OrangeButton'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function RegisterScreen() {
    const { onRegister } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
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
        router.push('/auth/loginPage')
    }

    return (
        <View style={styles.container}>
            <View style={styles.registerContainer}>
                <TextInput
                    style={styles.placeholder}
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.placeholder}
                    placeholder="Hasło"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.placeholder}
                    placeholder="Potwierdź hasło"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
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
        </View>
    )
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

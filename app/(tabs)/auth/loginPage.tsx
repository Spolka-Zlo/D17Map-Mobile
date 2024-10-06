import { OrangeButton } from '@/components/OrangeButton'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function LoginScreen() {
    const { onLogin } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            const response = await onLogin(username, password)
            if (response?.token) {
                console.log('Login successful')
                router.push('/(tabs)')
                setError('')
                setUsername('')
                setPassword('')
            } else {
                setError('Login failed. Please check your credentials.')
            }
        } catch (err) {
            console.error(err)
            setError('An error occurred during login')
        }
    }

    const handleRegisterButton = () => {
        router.push('/auth/registerPage')
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
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
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <OrangeButton
                    text="ZALOGUJ SIĘ"
                    onPress={handleLogin}
                    textClassName={styles.textClassName}
                />
                <Text style={styles.joinText}>
                    Nie masz konta? Dołącz do nas!
                </Text>
                <OrangeButton
                    text="ZAREJESTRUJ SIĘ"
                    onPress={handleRegisterButton}
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
    loginContainer: {
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
    },
    joinText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
})

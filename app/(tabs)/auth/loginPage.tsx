import { OrangeButton } from '@/components/OrangeButton'
import Colors from '@/constants/Colors'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native'

export default function LoginScreen() {
    const { onLogin } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const passwordInputRef = useRef<TextInput>(null)

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            const response = await onLogin(username, password)
            if (response?.token) {
                router.push('/(tabs)')
            } else {
                setError('Logowanie nieudane, spróbuj ponownie za chwilę.')
            }
        } catch (err) {
            console.error(err)
            setError('An error occurred during login')
        }
    }

    const handleRegisterButton = () => {
        Keyboard.dismiss()
        router.push('/auth/registerPage')
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
                    <View style={styles.loginContainer}>
                        <TextInput
                            style={styles.placeholder}
                            placeholder="Nazwa użytkownika"
                            value={username}
                            onChangeText={setUsername}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current?.focus()
                            }
                            blurOnSubmit={false}
                        />
                        <TextInput
                            ref={passwordInputRef}
                            style={styles.placeholder}
                            placeholder="Hasło"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
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
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mapGrey,
        padding: 20,
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
        maxWidth: 277,
    },
    joinText: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
})

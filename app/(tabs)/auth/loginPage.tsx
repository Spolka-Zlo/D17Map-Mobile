import { OrangeButton } from '@/components/OrangeButton'
import { Spinner } from '@/components/Spinner'
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
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function LoginScreen() {
    const { onLogin } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    const passwordInputRef = useRef<TextInput>(null)

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            setIsLoading(true);
            const response = await onLogin(username, password);
            if (response?.token) {
                setIsLoading(false);
                router.push('/(tabs)');
            } else {
                setIsLoading(false);
                if (response?.status === 401) {
                    setError('Błędne dane logowania.');
                } else {
                    setError('Logowanie nieudane, spróbuj ponownie za chwilę.');
                }
            }
        } catch {
            setIsLoading(false);
            setError('Wystąpił błąd, spróbuj ponownie później.');
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
            <Spinner isLoading={isLoading} text='Logowanie do serwisu'/>
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
                        <View style={styles.passwordContainer}>
                            <TextInput
                                ref={passwordInputRef}
                                style={styles.placeholder}
                                placeholder="Hasło"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword} // Ukrywa/odsłania hasło
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    name={showPassword ? 'visibility' : 'visibility-off'}
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        bottom: 40,
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

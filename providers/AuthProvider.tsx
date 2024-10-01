import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { ipaddress } from '@/constants/IP'

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null; userId: number | null }
    onRegister: (email: string, password: string) => Promise<any>
    onLogin: (email: string, password: string) => Promise<any>
    onLogout: () => Promise<any>
}

const TOKEN_KEY = 'token'
const USERID_KEY = 'userId'
const API_URL = ipaddress
const AuthContext = createContext<AuthProps>({
    onRegister: async () => {},
    onLogin: async () => {},
    onLogout: async () => {},
    authState: { token: null, authenticated: null, userId: null },
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null
        authenticated: boolean | null
        userId: number | null
    }>({ token: null, authenticated: null, userId: null })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            const userId = await SecureStore.getItemAsync(USERID_KEY)
            if (token) {
                axios.defaults.headers.common['Authorization'] =
                    `Token ${token}`
                setAuthState({
                    token,
                    authenticated: true,
                    userId: userId ? parseInt(userId) : null,
                })
            }
        }
        loadToken()
    }, [])

    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/register/`, {
                username,
                password,
            })
            return response.data
        } catch (error) {
            return error
        }
    }
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}login/`, {
                username,
                password,
            })
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)
            await SecureStore.setItemAsync(
                USERID_KEY,
                response.data.userId.toString()
            )
            setAuthState({
                token: response.data.token,
                authenticated: true,
                userId: response.data.userId,
            })
            axios.defaults.headers.common['Authorization'] =
                `Token ${response.data.token}`
            console.log('Logged in')
            return response.data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        await SecureStore.deleteItemAsync(USERID_KEY)
        setAuthState({ token: null, authenticated: false, userId: null })
        axios.defaults.headers.common['Authorization'] = ''
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

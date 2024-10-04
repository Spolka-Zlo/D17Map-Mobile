import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { ipaddress } from '@/constants/IP'
import { router } from 'expo-router'

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null; userId: number | null; userType: string | null }
    onRegister: (email: string, password: string) => Promise<{
        token: any data: { userId: number; token: string; userType: string } 
}>
    onLogin: (email: string, password: string) => Promise<{ token: string; userId: number; userType: string }>
    onLogout: () => Promise<void>
}

const TOKEN_KEY = 'token'
const USERID_KEY = 'userId'
const USER_TYPE_KEY = 'userType'
const API_URL = ipaddress
const AuthContext = createContext<AuthProps>({
    onRegister: async () => {
        return { data: { userId: 0, token: '', userType: '' } }
    },
    onLogin: async () => {
        return { token: '', userId: 0, userType: '' }
    },
    onLogout: async () => {},
    authState: { token: null, authenticated: null, userId: null, userType: null },
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null
        authenticated: boolean | null
        userId: number | null
        userType: string | null
    }>({ token: null, authenticated: null, userId: null, userType: null })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            const userId = await SecureStore.getItemAsync(USERID_KEY)
            const userType = await SecureStore.getItemAsync(USER_TYPE_KEY)
            if (token) {
                axios.defaults.headers.common['Authorization'] =
                    `Token ${token}`
                setAuthState({
                    token,
                    authenticated: true,
                    userId: userId ? parseInt(userId) : null,
                    userType: userType ? userType : null
                })
            }
        }
        loadToken()
    }, [])
    
    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}register/`, {
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
            }, {
                timeout: 5000
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
                userType: response.data.userType
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
        setAuthState({ token: null, authenticated: false, userId: null, userType: null })
        axios.defaults.headers.common['Authorization'] = ''
        router.push('/auth/loginPage')
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

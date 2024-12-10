import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import { ReactNode } from 'react'
import { ipaddress } from '@/constants/ip'

interface AuthProps {
    // authState?: { token: string | null; authenticated: boolean | null; userId: number | null; userType: string | null }
    authState?: {
        token: string | null
        authenticated: boolean | null
        userType: string | null
    }
    onRegister: (email: string, password: string) => Promise<unknown>
    onLogin: (email: string, password: string) => Promise<unknown>
    onLogout: () => Promise<unknown>
}


const TOKEN_KEY = 'token'
const USERID_KEY = 'userId'
const USER_TYPE_KEY = 'userType'
const AuthContext = createContext<AuthProps>({
    onRegister: async () => {},
    onLogin: async () => {},
    onLogout: async () => {},
    authState: { token: null, authenticated: null, userType: null }
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null
        authenticated: boolean | null
        userType: string | null
    }>({ token: null, authenticated: null, userType: null })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            const userTypeString = await SecureStore.getItemAsync(USER_TYPE_KEY);
            const userType = userTypeString ? JSON.parse(userTypeString) : null
            axios.defaults.baseURL = ipaddress
            if (token) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${token}`
                setAuthState({
                    token,
                    authenticated: true,
                    userType: userType,
                })
            }
        }
        loadToken()
    }, [])

    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                'auth/register',
                {
                    username,
                    password,
                },
                {
                    timeout: 5000,
                }
            )
            return response.status === 201
        } catch {
            return false
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                'auth/login',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                    },
                    timeout: 5000,
                }
            )
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)
            const stringifiedRole = JSON.stringify(response.data.roles)
            await SecureStore.setItemAsync(USER_TYPE_KEY, stringifiedRole)
            setAuthState({
                token: response.data.token,
                authenticated: true,
                userType: response.data.roles,
            })
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${response.data.token}`
            return response.data
        } catch (error) {
            return error
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        await SecureStore.deleteItemAsync(USERID_KEY)
        await SecureStore.deleteItemAsync(USER_TYPE_KEY)
        setAuthState({ token: null, authenticated: false, userType: null })
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

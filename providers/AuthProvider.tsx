import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import { ReactNode } from 'react';
import { useQueryClient } from 'react-query';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null; userId: number | null; userType: string | null }
    onRegister: (email: string, password: string) => Promise<unknown>
    onLogin: (email: string, password: string) => Promise<unknown>
    onLogout: () => Promise<unknown>
    setApiUrl: (newIp: string) => Promise<unknown>
}


const IP_KEY = 'api_ip';
export const getApiUrl = async () => {
    const ip = await SecureStore.getItemAsync(IP_KEY);
    return ip || 'http://192.168.33.12:8000/api/';
  };
  
export const setApiUrl = async (newIp: string) => {
    await SecureStore.setItemAsync(IP_KEY, newIp);
    axios.defaults.baseURL = newIp;
    const queryClient = useQueryClient();
    queryClient.invalidateQueries();
};


const TOKEN_KEY = 'token'
const USERID_KEY = 'userId'
const USER_TYPE_KEY = 'userType'
const AuthContext = createContext<AuthProps>({
    onRegister: async () => {},
    onLogin: async () => {},
    onLogout: async () => {},
    authState: { token: null, authenticated: null, userId: null, userType: null },
    setApiUrl: async () => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
            const apiUrl = await getApiUrl();
            axios.defaults.baseURL = apiUrl;
            if (token) {
                axios.defaults.headers.common['Authorization'] =
                    `Token ${token}`
                setAuthState({
                    token,
                    authenticated: true,
                    userId: userId ? parseInt(userId) : null,
                    userType: userType
                })
            }
        }
        loadToken()
    }, [])
    
    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post('register/', {
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
            const response = await axios.post('login/', {
                username,
                password,
            }, {
                timeout: 5000
            })
            console.log(response)
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)
            await SecureStore.setItemAsync(
                USERID_KEY,
                response.data.userId.toString()
            )
            await SecureStore.setItemAsync(
                USER_TYPE_KEY,
                response.data.userType
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
        await SecureStore.deleteItemAsync(USER_TYPE_KEY)
        setAuthState({ token: null, authenticated: false, userId: null, userType: null })
        axios.defaults.headers.common['Authorization'] = ''
        router.push('/auth/loginPage')
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        setApiUrl: setApiUrl
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
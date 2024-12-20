// import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { router, Stack } from 'expo-router'
import 'react-native-reanimated'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { Image } from 'react-native'
import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import { OrangeButton } from '@/components/OrangeButton'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BuildingProvider } from '@/providers/BuildingProvider'
import React from 'react'

export {
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    initialRouteName: 'pages/buildingPage',
}



export default function RootLayout() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <BuildingProvider>
                <AuthProvider>
                    <RootLayoutNav />
                </AuthProvider>
            </BuildingProvider>
        </QueryClientProvider>
    )
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()

    const { onLogout, authState } = useAuth()

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitle: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/pages/buildingPage')
                            }}
                        >
                            <Image
                                // eslint-disable-next-line @typescript-eslint/no-require-imports
                                source={require('../assets/images/logo.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <OrangeButton
                            text={
                                authState?.authenticated ? 'Wyloguj się' : 'Logowanie'
                            }
                            onPress={() => {
                                if (authState?.authenticated) {
                                    onLogout()
                                } else {
                                    router.push('/auth/loginPage')
                                }
                            }}
                        />
                    ),
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: true, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="pages/buildingPage"
                    options={{
                        headerRight: () => {
                            return <></>
                        },
                        title: 'Wybierz budynek',
                        headerBackVisible: false,
                    }}
                />
            </Stack>
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    },
})

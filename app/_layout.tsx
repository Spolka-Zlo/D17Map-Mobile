// import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import 'react-native-reanimated'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { Image } from 'react-native'
import { Text } from 'react-native'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    // const [loaded, error] = useFonts({
    //     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    //     ...FontAwesome.font,
    // })

    // // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    // useEffect(() => {
    //     if (error) throw error
    // }, [error])

    // useEffect(() => {
    //     if (loaded) {
    //         SplashScreen.hideAsync()
    //     }
    // }, [loaded])

    // if (!loaded) {
    //     return null
    // }

    return <RootLayoutNav />
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()

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
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.image}
                        />
                    ),
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
                <Stack.Screen
                    name="modal"
                    options={{ presentation: 'modal' }}
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

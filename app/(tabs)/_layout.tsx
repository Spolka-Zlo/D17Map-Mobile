import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { useAuth } from '@/providers/AuthProvider'
import { FontAwesome5 } from '@expo/vector-icons'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const { authState } = useAuth()

    // Tworzymy tablicę zakładek
    const screens = [
        <Tabs.Screen
            key="map"
            name="map"
            options={{
                title: 'Map',
                tabBarIcon: () => (
                    <FontAwesome5
                        size={28}
                        name="map-marker"
                        color={Colors.secondary}
                    />
                ),
            }}
        />,
        <Tabs.Screen
            key="index"
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: () => (
                    <FontAwesome5
                        size={28}
                        name="home"
                        color={Colors.secondary}
                    />
                ),
            }}
        />,
    ]

    const hiddenScreens = [
        "reservation/[roomId]",
        "reservation/newReservation",
        "reservation/components/ReservationList",
        "reservation/components/ReservationManager",
        "auth/loginPage",
        "auth/registerPage",
    ]

    if (authState?.authenticated) {
        screens.push(
            <Tabs.Screen
                key="reservation/index"
                name="reservation/index"
                options={{
                    title: 'Reservation',
                    tabBarIcon: () => (
                        <FontAwesome5
                            size={28}
                            name="book"
                            color={Colors.secondary}
                        />
                    ),
                }}
            />
        )
    } else {
        hiddenScreens.push("reservation/index")
    }

    hiddenScreens.forEach((screenName) => {
        screens.push(
            <Tabs.Screen
                key={screenName}
                name={screenName}
                options={{
                    tabBarButton: () => null,
                    // unmountOnBlur: true, -- for furute use
                }}
            />
        )
    })

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarStyle: { backgroundColor: Colors.primary, paddingTop: 5 },
            }}
        >
            {screens}
        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

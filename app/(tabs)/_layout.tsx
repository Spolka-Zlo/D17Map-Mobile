import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarStyle: { backgroundColor: Colors.primary, paddingTop: 5 },
            }}
        >
            <Tabs.Screen
                name="map"
                options={{
                    title: 'Map',
                    tabBarIcon: () => (
                        <FontAwesome
                            size={28}
                            name="map-marker"
                            color={Colors.secondary}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => (
                        <FontAwesome
                            size={28}
                            name="home"
                            color={Colors.secondary}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="reservation/index"
                options={{
                    title: 'Reservation',
                    tabBarIcon: () => (
                        <FontAwesome
                            size={28}
                            name="book"
                            color={Colors.secondary}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="reservation/[roomId]"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="reservation/newReservation"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="reservation/components/ReservationList"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="reservation/components/ReservationManager"
                options={{
                    href: null,
                }}
            />
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

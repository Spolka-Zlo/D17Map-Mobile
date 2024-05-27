import React from 'react'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// temp const out to prevent errors in the app waiting for the icons to be fixed by the expo team
const FontAwesome5 = (a: any) => <></>

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
                        <FontAwesome5
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
                        <FontAwesome5
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
                        <FontAwesome5
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
            <Tabs.Screen
                name="reservation/completeReservation"
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

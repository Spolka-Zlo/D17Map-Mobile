import { Tabs } from 'expo-router'
import 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useAuth } from '@/providers/AuthProvider'
import { FontAwesome5 } from '@expo/vector-icons'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
    const colorScheme = useColorScheme()
    const { authState } = useAuth()

    const screens = [
        <Tabs.Screen
            key="map"
            name="map/map"
            options={{
                title: 'Map',
                tabBarIcon: () => (
                    <FontAwesome5
                        size={28}
                        name="map-marker"
                        color={Colors.secondary}
                    />
                ),
                unmountOnBlur: true,
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
                unmountOnBlur: true,
            }}
        />,
    ]

    const hiddenScreens = [
        {name: "reservation/[roomId]", params: {onmountBlur: false}},
        { name: "reservation/newReservation", params: {onmountBlur: true} },
        { name: "reservation/components/ReservationList", params: {onmountBlur: false} },
        { name: "reservation/components/ReservationManager", params: {onmountBlur: false} },
        { name: "auth/loginPage", params: {onmountBlur: true} },
        { name: "auth/registerPage", params: {onmountBlur: true} },
        { name: "map/[floor]", params: {onmountBlur: true} },
    ]

    const roles = authState?.userType
    if (
        authState?.authenticated &&
        (
            (Array.isArray(roles) && !(roles.length === 1 && roles[0] === 'STUDENT'))
        )
    ) {
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
                    unmountOnBlur: true,
                }}
            />
        )
    } else {
        hiddenScreens.push({name: "reservation/index", params: {onmountBlur: false}})
    }

    hiddenScreens.forEach((screen) => {
        screens.push(
            <Tabs.Screen
                key={screen.name}
                name={screen.name}
                options={{
                    tabBarButton: () => null,
                    unmountOnBlur: screen.params.onmountBlur,
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

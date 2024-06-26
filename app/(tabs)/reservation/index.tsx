import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { Link } from 'expo-router'

export default function Reservations() {
    console.log('TabReservationsScreen')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reservations</Text>
            <View style={styles.separator} />
            <Text>
                Choose a room:
                <Link href="/(tabs)/reservation/1">Room 1</Link>
                <Link href="/(tabs)/reservation/2">Room 2</Link>
            </Text>
        </View>
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

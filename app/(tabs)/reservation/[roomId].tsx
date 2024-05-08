import { StyleSheet, View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Reservations() {
    const { roomId } = useLocalSearchParams()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reservation {roomId}</Text>
            <View/>
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

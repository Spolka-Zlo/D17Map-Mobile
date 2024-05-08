import { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Reservation } from '..'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

type ReservationManagerProps = {
    reservation: Reservation
    setReservation: Dispatch<SetStateAction<Reservation | null>>
}

export default function ReservationManager({
    reservation,
    setReservation,
}: ReservationManagerProps) {
    return (
        <TouchableOpacity
            onPress={() => setReservation(null)}
            style={styles.container}
        >
                <View
                    style={styles.box}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <Text>Reservation Manager</Text>
                    <Text>{reservation?.name}</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        position: 'absolute',
        top: 40,
        left: 30,
        right: 30,
    },
    box: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

import { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Reservation } from '..'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Styles } from '@/constants/Styles'
import { formatTime } from '@/app/utils/timeUtils'


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
            <View style={styles.flex} onTouchStart={(e) => e.stopPropagation()}>
                <View style={styles.box}>
                    <Text style={Styles.h2}>{reservation?.title}</Text>
                    <Text>{reservation?.room}</Text>
                    <Text>
                        {reservation?.date} {formatTime(reservation?.startTime)}-{formatTime(reservation?.endTime)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary + '80',
        zIndex: 1,
    },
    flex: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

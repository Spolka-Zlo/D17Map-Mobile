import { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Reservation } from '..'
import Colors from '@/constants/Colors'
import { Styles } from '@/constants/Styles'
import { formatTime } from '@/app/utils/timeUtils'
import { useDeleteReservation } from '@/services/reservationService'
import { useAuth } from '@/providers/AuthProvider'


type ReservationManagerProps = {
    reservation: Reservation
    setReservation: Dispatch<SetStateAction<Reservation | null>>
}


export default function ReservationManager(props: ReservationManagerProps) {
    const { authState } = useAuth();
    const mutation = useDeleteReservation( authState?.userId ?? 0);


    const handleDelete = (id: number) => {
        mutation.mutate(id, {
            onSuccess: () => {
                props.setReservation(null);
            },
            onError: () => {
                // modal z informacją o błędzie
            }
        });
    };

    return (
        <TouchableOpacity
            onPress={() => props.setReservation(null)}
            style={styles.container}
        >
            <View style={styles.flex} onTouchStart={(e) => e.stopPropagation()}>
                <View style={styles.box}>
                    <Text style={Styles.h2}>{props.reservation?.title}</Text>
                    <Text>{props.reservation?.room}</Text>
                    <Text>
                        {props.reservation?.date} {formatTime(props.reservation?.startTime)}-{formatTime(props.reservation?.endTime)}
                    </Text>
                    <TouchableOpacity onPress={() => handleDelete(props.reservation.id)} style={styles.errorButton}>
                        <Text style={styles.errorButtonText}>Usuń rezerwacje</Text>
                    </TouchableOpacity>
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
    errorButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

import { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import { Reservation } from '..'
import Colors from '@/constants/Colors'
import { Styles } from '@/constants/Styles'
import { formatTime } from '@/app/utils/timeUtils'
import { useDeleteReservation } from '@/services/reservationService'
import { useAuth } from '@/providers/AuthProvider'
import InfoModal from '@/app/modals/errrorModal'
import Spinner from 'react-native-loading-spinner-overlay'

type ReservationManagerProps = {
    reservation: Reservation
    setReservation: Dispatch<SetStateAction<Reservation | null>>
}

export default function ReservationManager(props: ReservationManagerProps) {
    const { authState } = useAuth()
    const mutation = useDeleteReservation(authState?.userId ?? 0)

    const handleDelete = (id: number) => {
        mutation.mutate(id)
    }

    return (
        <View>
            {mutation.isSuccess && (
                <InfoModal
                    text="Rezerwacja usunięta"
                    visible={mutation.isSuccess}
                    onClose={() => props.setReservation(null)}
                />
            )}
            {mutation.isError ? (
                <InfoModal
                    text="Nie udało się usunąć rezerwacji"
                    visible={mutation.isError}
                    onClose={() => mutation.reset()}
                />
            ) : (
                <View>
                    <View onTouchStart={(e) => e.stopPropagation()}>
                        <Spinner
                            visible={mutation.isLoading}
                            cancelable={false}
                            textContent="Usuwanie rezerwacji"
                            overlayColor='rgba(0, 0, 0, 0.7)'
                            textStyle={{ color: Colors.white }}
                        />
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={!!props.reservation}
                        onRequestClose={() => props.setReservation(null)}
                    >
                        <TouchableOpacity
                            style={styles.modalBackground}
                            activeOpacity={1}
                            onPress={() => props.setReservation(null)}
                        >
                            <View
                                style={styles.flex}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                <View style={styles.box}>
                                    <Text style={Styles.h2}>
                                        {props.reservation?.title}
                                    </Text>
                                    <Text>{props.reservation?.room}</Text>
                                    <Text>
                                        {props.reservation?.date}{' '}
                                        {formatTime(
                                            props.reservation?.startTime
                                        )}
                                        -
                                        {formatTime(props.reservation?.endTime)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleDelete(props.reservation.id)
                                        }
                                        style={styles.errorButton}
                                    >
                                        <Text style={styles.errorButtonText}>
                                            Usuń rezerwacje
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import { formatTime } from '@/app/utils/timeUtils'
import {
    Equipment,
    ReservationWithClassRoomInfo,
    Room,
} from '@/constants/types'
import { OrangeButton } from '../OrangeButton'
import { useDeleteReservation } from '@/services/reservationService'
import InfoModal from '../InfoModal'
import Spinner from 'react-native-loading-spinner-overlay'
import Colors from '@/constants/Colors'
import { useEquipmentOptions } from '@/services/classroomService'

type ReservationInfoComponentProps = {
    reservation: ReservationWithClassRoomInfo
    setReservation: (reservation: ReservationWithClassRoomInfo | null) => void
    setEditSectionVisible: (visible: boolean) => void
    classRooms: Room[]
}

export default function ReservationInfoComponent(
    props: ReservationInfoComponentProps
) {
    if (!props.reservation || !props.classRooms) return null

    const classroomName = props.classRooms.find(
        (room: Room) => room.id === props.reservation.classroom.id
    )?.name

    const { equipmentOptions } = useEquipmentOptions()
    const classroomEquipment =
        equipmentOptions?.filter((option: Equipment) =>
            props.classRooms
                .find(
                    (room: Room) => room.id === props.reservation.classroom.id
                )
                ?.equipmentIds.includes(option.id)
        ) || []

    const deleteMutation = useDeleteReservation()

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }

    return (
        <View>
            {deleteMutation.isSuccess && (
                <InfoModal
                    text="Rezerwacja usunięta"
                    visible={deleteMutation.isSuccess}
                    onClose={() => props.setReservation(null)}
                />
            )}
            {deleteMutation.isError ? (
                <InfoModal
                    text="Nie udało się usunąć rezerwacji"
                    visible={deleteMutation.isError}
                    onClose={() => deleteMutation.reset()}
                />
            ) : (
                <View>
                    <View onTouchStart={(e) => e.stopPropagation()}>
                        <Spinner
                            visible={deleteMutation.isLoading}
                            cancelable={false}
                            textContent="Usuwanie rezerwacji"
                            overlayColor="rgba(0, 0, 0, 0.7)"
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
                            <TouchableWithoutFeedback>
                                <View
                                    style={styles.box}
                                    onTouchStart={(e) => e.stopPropagation()}
                                >
                                    <Text style={Styles.h1}>
                                        {props.reservation?.title}
                                    </Text>
                                    <Text style={styles.dateString}>
                                        {props.reservation?.date}{' '}
                                        {formatTime(
                                            props.reservation?.startTime
                                        )}
                                        -
                                        {formatTime(props.reservation?.endTime)}
                                    </Text>
                                    <Text style={styles.classroomName}>
                                        {classroomName}
                                    </Text>
                                    <Text style={styles.equipment}>
                                        Wyposażenie sali:
                                    </Text>
                                    <Text style={styles.equipmentList}>
                                        {classroomEquipment
                                            .map(
                                                (equipment: Equipment) =>
                                                    equipment.name
                                            )
                                            .join(', ')}
                                    </Text>
                                    <View style={{ width: '90%' }}>
                                        <OrangeButton
                                            text="Edytuj"
                                            onPress={() =>
                                                props.setEditSectionVisible(
                                                    true
                                                )
                                            }
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleDelete(props.reservation.id)
                                        }
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.deleteButtonText}>
                                            Usuń rezerwacje
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
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
    flex: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.8 * Dimensions.get('window').width,
    },
    dateString: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    classroomName: {
        fontSize: 20,
        marginVertical: 10,
    },
    equipment: {
        fontSize: 20,
    },
    equipmentList: {
        marginVertical: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

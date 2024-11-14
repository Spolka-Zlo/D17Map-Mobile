import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native'
import InfoModal from '../InfoModal'
import { Room, ReservationWithClassRoomInfo } from '@/constants/types'
import { useEditReservation } from '@/services/reservationService'
import Spinner from 'react-native-loading-spinner-overlay'
import Colors from '@/constants/Colors'
import { OrangeButton } from '../OrangeButton'
import { useAvailableClassrooms } from '@/services/classroomService'
import { useReservationTypes } from '@/services/reservationTypeService'
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

type EditReservationComponentProps = {
    reservation: ReservationWithClassRoomInfo
    setReservation: (reservation: ReservationWithClassRoomInfo | null) => void
    setEditSectionVisible: (visible: boolean) => void
    classRooms: Room[]
}

export default function EditReservationComponent(
    props: EditReservationComponentProps
) {
    const editMutation = useEditReservation()

    const [title, setTitle] = useState(props.reservation?.title || '')
    const [description, setDescription] = useState(
        props.reservation?.description || ''
    )

    const { availableClassrooms } = useAvailableClassrooms(
        props.reservation?.date,
        props.reservation?.startTime,
        props.reservation?.endTime,
        props.reservation?.numberOfParticipants
    )

    const availableClassroomsData = [
        {
            label: props.reservation.classroom.name,
            value: props.reservation.classroom.id,
        },
        ...(availableClassrooms
            ? availableClassrooms.map((room: Room) => ({
                  label: room.name,
                  value: room.id,
              }))
            : []),
    ]

    const [selectedClassroomId, setSelectedClassroomId] = useState(
        props.reservation.classroom.id || ''
    )

    const { reservationTypes } = useReservationTypes()
    const reservationTypesData = reservationTypes
        ? reservationTypes.map((type: string) => {
              return { label: type, value: type }
          })
        : [{ label: props.reservation?.type, value: props.reservation?.type }]

    const [selectedType, setSelectedType] = useState(
        props.reservation?.type || ''
    )

    const handleEdit = () => {
        if (title && description && selectedType) {
            editMutation.mutate({
                id: props.reservation.id,
                title,
                description,
                date: props.reservation.date,
                startTime: props.reservation.startTime,
                endTime: props.reservation.endTime,
                classroomId: selectedClassroomId,
                type: selectedType,
                numberOfParticipants: props.reservation.numberOfParticipants,
            })
        }
    }

    return (
        <View>
            {editMutation.isSuccess && (
                <InfoModal
                    text="Rezerwacja zapisana"
                    visible={editMutation.isSuccess}
                    onClose={() => props.setReservation(null)}
                />
            )}
            {editMutation.isError ? (
                <InfoModal
                    text="Nie udało się zapisać rezerwacji"
                    visible={editMutation.isError}
                    onClose={() => editMutation.reset()}
                />
            ) : (
                <View>
                    <Spinner
                        visible={editMutation.isLoading}
                        cancelable={false}
                        textContent="Zapisywanie rezerwacji"
                        overlayColor="rgba(0, 0, 0, 0.7)"
                        textStyle={{ color: Colors.white }}
                    />
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
                                    <Text style={styles.textStyle}>
                                        Tytuł rezerwacji:
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={title}
                                        onChangeText={setTitle}
                                    />

                                    <Text style={styles.textStyle}>Opis:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={description}
                                        onChangeText={setDescription}
                                    />
                                    <Text style={styles.textStyle}>
                                        Typ rezerwacji:
                                    </Text>
                                    <View style={styles.dropdownContainer}>
                                        <Dropdown
                                            data={reservationTypesData}
                                            value={selectedType}
                                            labelField={'label'}
                                            valueField={'value'}
                                            onChange={(value: {
                                                label: string
                                                value: string
                                                _index: number
                                            }) => setSelectedType(value.value)}
                                            maxHeight={200}
                                            style={styles.dropdown}
                                        />
                                    </View>
                                    <Text style={styles.textStyle}>
                                        Dostępne sale:
                                    </Text>
                                    <View style={styles.dropdownContainer}>
                                        <Dropdown
                                            data={availableClassroomsData}
                                            value={selectedClassroomId}
                                            labelField={'label'}
                                            valueField={'value'}
                                            onChange={(value) =>
                                                setSelectedClassroomId(
                                                    value.value
                                                )
                                            }
                                            maxHeight={200}
                                            style={styles.dropdown}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={handleEdit}
                                        style={styles.editButton}
                                    >
                                        <Text style={styles.editButtonText}>
                                            Zapisz zmiany
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '90%' }}>
                                        <OrangeButton
                                            text="Powrót"
                                            onPress={() =>
                                                props.setEditSectionVisible(
                                                    false
                                                )
                                            }
                                        />
                                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.mapGrey,
        padding: 8,
        marginVertical: 10,
        borderRadius: 8,
        width: '90%',
    },
    dropdownContainer: {
        width: '90%',
        zIndex: 2,
        marginVertical: 10,
    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.mapGrey,
        borderRadius: 8,
        padding: 10,
    },
    editButton: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        width: '90%',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    editButtonText: {
        color: 'white',
        textAlign: 'center',
    },
})

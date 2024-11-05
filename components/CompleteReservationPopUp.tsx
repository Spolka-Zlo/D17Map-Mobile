import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { Reservation, Room } from '@/constants/types'
import Dropdown from './Dropdown'
import { router } from 'expo-router'
import { useReservationTypes } from '@/services/reservationTypeService'
import { useCreateReservation } from '@/services/reservationService'
import Spinner from 'react-native-loading-spinner-overlay'
import InfoModal from '@/components/InfoModal'
import { useEquipmentOptions } from '@/services/classroomService'



type CompleteReservationPopUpProps = {
    setSelectedRoom: (room: Room | null) => void
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
    room: Room
    date: Date | null
    startTime: string
    endTime: string
}

export default function CompleteReservationPopUp({
    setSelectedRoom,
    setScrollAvailable,
    room,
    date,
    startTime,
    endTime,
}: CompleteReservationPopUpProps) {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [name, setName] = useState('')
    const { reservationTypes } = useReservationTypes()
    const [selectedReservationType, setSelectedReservationType] = useState(
        'Wybierz typ rezerwacji'
    )
    const [description, setDescription] = useState('')
    const [numberOfParticipants, setNumberOfParticipants ] = useState(room.capacity)
    const { equipmentOptions } = useEquipmentOptions()
    const [error, setError] = useState(false)
    const createMutation = useCreateReservation()

    useEffect(() => {
        setScrollAvailable(false)
        setError(false)
    }, [])

    const handleSubmit = async () => {
        const reservation: Reservation = {
            id: '',
            title: name,
            description: description,
            classroomId: room.id,
            date: date ? date.toISOString().split('T')[0] : '',
            startTime: startTime.split(':').map((unit: string) => unit.padStart(2, '0')).join(':'),
            endTime: endTime.split(':').map((unit: string) => unit.padStart(2, '0')).join(':'),
            type: selectedReservationType,
            numberOfParticipants: numberOfParticipants,
        }
        createMutation.mutate(reservation, {
            onSuccess: () => {
                setSelectedRoom(null)
                setScrollAvailable(true)
                setSelectedReservationType('Wybierz typ rezerwacji')
                router.navigate('/reservation')
            },
            onError: () => {
                setError(true)
            },
        })
    }

    return (
        <View>
            <Spinner
                visible={createMutation.isLoading}
                cancelable={false}
                textContent="Tworzenie rezerwacji"
                overlayColor="rgba(0, 0, 0, 0.7)"
                textStyle={{ color: Colors.white }}
            />
            <InfoModal
                text="Nie udało się utworzyć rezerwacji"
                visible={createMutation.isError}
                onClose={() => router.navigate('/')}
            />
            <Modal transparent={true} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.box}>
                        <TextInput
                            placeholder="Nazwa rezerwacji"
                            onChangeText={setName}
                            value={name}
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                        />
                        <TextInput
                            placeholder="Opis rezerwacji"
                            onChangeText={setDescription}
                            value={description}
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                        />
                        <Text>
                            Liczba uczestników: {numberOfParticipants}
                        </Text>
                        <TextInput
                            placeholder="Liczba uczestników"
                            onChangeText={(value) => setNumberOfParticipants(Number(value))}
                            value={numberOfParticipants.toString()}
                            style={styles.input}
                            placeholderTextColor={Colors.secondary}
                            keyboardType="numeric"
                        />
                        <View style={{ zIndex: 2 }}>
                            <Dropdown
                                options={reservationTypes!}
                                selected={selectedReservationType}
                                setSelected={setSelectedReservationType}
                                isOpen={isDropDownOpen}
                                setIsOpen={setIsDropDownOpen}
                            />
                        </View>
                        {date && (
                            <Text>
                                {date?.toISOString().split('T')[0] || ''}
                            </Text>
                        )}
                        <Text>
                            {startTime} - {endTime}
                        </Text>
                        <Text>{room.name}</Text>
                        <Text>{room.capacity} miejsc</Text>
                        <Text>
                            {room.equipmentIds.map((equipmentId) => {
                                const equipment = equipmentOptions?.find(
                                    (option: { id: string }) => option.id === equipmentId
                                )
                                return equipment ? equipment.name : ''
                            })}
                        </Text>
                        {selectedReservationType ===
                            'Wybierz typ rezerwacji' && (
                            <Text style={styles.error}>
                                Wybierz typ rezerwacji
                            </Text>
                        )}
                        {name === '' && (
                            <Text style={styles.error}>
                                Podaj nazwę rezerwacji
                            </Text>
                        )}
                        {name !== '' &&
                            selectedReservationType !==
                                'Wybierz typ rezerwacji' &&
                            !error && (
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.submit}
                                >
                                    <Text style={styles.label}>Rezerwuj</Text>
                                </TouchableOpacity>
                            )}
                        {error && (
                            <Text style={styles.error}>
                                Wystąpił błąd, spróbuj ponownie
                            </Text>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedRoom(null)
                                setScrollAvailable(true)
                            }}
                            style={styles.cancel}
                        >
                            <Text style={styles.label}>Zamknij</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    input: {
        backgroundColor: Colors.primary,
        fontWeight: 'bold',
        color: Colors.secondary,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: 200,
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancel: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        padding: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    submit: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        padding: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
})
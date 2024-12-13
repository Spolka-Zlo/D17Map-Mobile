import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { Reservation, Room } from '@/constants/types'
import { router } from 'expo-router'
import { useReservationTypes } from '@/services/reservationTypeService'
import { useCreateReservation } from '@/services/reservationService'
import Spinner from 'react-native-loading-spinner-overlay'
import InfoModal from '@/components/InfoModal'
import { useEquipmentOptions } from '@/services/classroomService'
import { Dropdown } from 'react-native-element-dropdown'
import { OrangeButton } from './OrangeButton'

type CompleteReservationPopUpProps = {
    setSelectedRoom: (room: Room | null) => void
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
    room: Room
    date: Date | null
    startTime: string
    endTime: string
}

export default function CompleteReservationPopUp(
    props: CompleteReservationPopUpProps
) {
    const [name, setName] = useState('')
    const { reservationTypes } = useReservationTypes()
    const reservationTypesData = reservationTypes
        ? reservationTypes.map((type: string) => {
              return { label: type, value: type }
          })
        : []

    const [selectedType, setSelectedType] = useState(
        reservationTypesData[0]?.value || 'Wybierz typ rezerwacji'
    )

    const [description, setDescription] = useState('')
    const [numberOfParticipants, setNumberOfParticipants] = useState(
        props.room.capacity
    )

    const titleInputRef = useRef<TextInput>(null)
    const descriptionInputRef = useRef<TextInput>(null)
    const participantsInputRef = useRef<TextInput>(null)

    const { equipmentOptions } = useEquipmentOptions()
    const [error, setError] = useState(false)
    const createMutation = useCreateReservation()

    useEffect(() => {
        props.setScrollAvailable(false)
        setError(false)
    }, [])

    const handleSubmit = async () => {
        const reservation: Reservation = {
            id: '',
            title: name,
            description: description,
            classroomId: props.room.id,
            date: props.date ? props.date.toISOString().split('T')[0] : '',
            startTime: props.startTime
                .split(':')
                .map((unit: string) => unit.padStart(2, '0'))
                .join(':'),
            endTime: props.endTime
                .split(':')
                .map((unit: string) => unit.padStart(2, '0'))
                .join(':'),
            type: selectedType,
            numberOfParticipants: numberOfParticipants,
        }
        createMutation.mutate(reservation, {
            onSuccess: () => {
                props.setSelectedRoom(null)
                props.setScrollAvailable(true)
                setSelectedType('Wybierz typ rezerwacji')
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
                onClose={() => router.navigate('/(tabs)/reservation')}
            />
            <Modal transparent={true} animationType="fade">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.modalBackground}
                >
                    <View style={styles.box}>
                        <ScrollView
                            contentContainerStyle={{ alignItems: 'center' }}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text style={styles.textStyle}>
                                Tytuł rezerwacji:
                            </Text>
                            <TextInput
                                ref={titleInputRef}
                                placeholder="Tytuł rezerwacji"
                                onChangeText={setName}
                                value={name}
                                style={styles.input}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    descriptionInputRef.current?.focus()
                                }}
                            />
                            <Text style={styles.textStyle}>
                                Opis rezerwacji:
                            </Text>
                            <TextInput
                                ref={descriptionInputRef}
                                placeholder="Opis rezerwacji"
                                onChangeText={setDescription}
                                value={description}
                                style={styles.input}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    participantsInputRef.current?.focus()
                                }}
                            />
                            <Text style={styles.textStyle}>
                                Liczba uczestników:
                            </Text>
                            <TextInput
                                ref={participantsInputRef}
                                placeholder="Liczba uczestników"
                                onChangeText={(value) =>
                                    setNumberOfParticipants(Number(value))
                                }
                                value={numberOfParticipants.toString()}
                                style={styles.input}
                                keyboardType="numeric"
                                returnKeyType="done"
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
                                    placeholder="Wybierz typ rezerwacji"
                                />
                            </View>
                            <Text style={styles.textStyle}>
                                Inne informacje:
                            </Text>
                            <View style={styles.dateTimeContainer}>
                                {props.date && (
                                    <Text style={styles.textStyle}>
                                        {props.date
                                            ?.toISOString()
                                            .split('T')[0] || ''}
                                    </Text>
                                )}
                                <Text style={styles.textStyle}>
                                    {props.startTime} - {props.endTime}
                                </Text>
                            </View>
                            <Text style={styles.roomTextStyle}>
                                {props.room.name} - {props.room.capacity} miejsc
                            </Text>
                            <Text style={styles.textStyle}>
                                {props.room.equipmentIds.map((equipmentId) => {
                                    const equipment = equipmentOptions?.find(
                                        (option: { id: string }) =>
                                            option.id === equipmentId
                                    )
                                    return equipment ? equipment.name + ' ' : ''
                                })}
                            </Text>
                            {name === '' && (
                                <Text style={styles.error}>
                                    Podaj nazwę rezerwacji
                                </Text>
                            )}
                            {selectedType === 'Wybierz typ rezerwacji' && (
                                <Text style={styles.error}>
                                    Wybierz typ rezerwacji
                                </Text>
                            )}
                            {name !== '' &&
                                selectedType !== 'Wybierz typ rezerwacji' &&
                                !error && (
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={styles.submit}
                                    >
                                        <Text style={styles.submitText}>
                                            Rezerwuj
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            {error && (
                                <Text style={styles.error}>
                                    Wystąpił błąd, spróbuj ponownie
                                </Text>
                            )}
                            <View style={{ width: '90%', marginTop: 10 }}>
                                <OrangeButton
                                    text="Powrót"
                                    onPress={() => {
                                        props.setSelectedRoom(null)
                                        props.setScrollAvailable(true)
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
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
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    roomTextStyle: {
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center',
        fontWeight: 'bold',
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
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    cancel: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    submit: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        width: '90%',
    },
    submitText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
    },
})

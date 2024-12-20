import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import CheckBox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import TimePicker from './TimePicker'
import { DayReservation } from '@/app/(tabs)/reservation/newReservation'
import CompleteReservationPopUp from './CompleteReservationPopUp'
import { useEquipmentOptions } from '@/services/classroomService'
import { Room } from '@/constants/types'

type SearchByTermSectionProps = {
    reservations: DayReservation[]
    rooms: Room[]
    date: Date | null
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchByTermSection({
    reservations,
    rooms,
    date,
    setScrollAvailable,
}: SearchByTermSectionProps) {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
    const [minNumberOfSeats, setMinNumberOfSeats] = useState(0)
    const [availableRooms, setAvailableRooms] = useState<Room[]>([])
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const { equipmentOptions } = useEquipmentOptions()

    const handleChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '')
        setMinNumberOfSeats(numericValue === '' ? 0 : parseInt(numericValue))
    }

    useEffect(() => {
        availableRoomsHandler()
    }, [minNumberOfSeats, startTime, endTime, selectedEquipment, reservations])

    const availableRoomsHandler = async () => {
        const filteredRooms = rooms.filter((room) => {
            if (room.capacity < minNumberOfSeats) return false

            if (selectedEquipment.length > 0) {
                const hasAllEquipment = selectedEquipment.every((equipment) =>
                    room.equipmentIds.some((roomEquipment) => roomEquipment === equipment)
                );
                if (!hasAllEquipment) return false
            }
            if (!reservations) return true
            const isAvailable = reservations.every((reservation) => {
                if (reservation.classroom.name !== room.name) return true

                const startTimeInt =
                    parseInt(startTime.split(':')[0]) * 60 +
                    parseInt(startTime.split(':')[1])
                const endTimeInt =
                    parseInt(endTime.split(':')[0]) * 60 +
                    parseInt(endTime.split(':')[1])
                const reservationStartTimeInt =
                    parseInt(reservation.startTime.split(':')[0]) * 60 +
                    parseInt(reservation.startTime.split(':')[1])
                const reservationEndTimeInt =
                    parseInt(reservation.endTime.split(':')[0]) * 60 +
                    parseInt(reservation.endTime.split(':')[1])
                if (
                    (startTimeInt >= reservationStartTimeInt &&
                        startTimeInt < reservationEndTimeInt) ||
                    (endTimeInt > reservationStartTimeInt &&
                        endTimeInt <= reservationEndTimeInt) ||
                    (startTimeInt >= reservationStartTimeInt &&
                        endTimeInt <= reservationEndTimeInt) ||
                    (startTimeInt <= reservationStartTimeInt &&
                        endTimeInt >= reservationEndTimeInt)
                ) {
                    return false
                }

                return true
            })

            return isAvailable
        })

        setAvailableRooms(filteredRooms)
    }

    return (
        <View style={styles.container}>
            <TimePicker setStartTime={setStartTime} setEndTime={setEndTime} />
            <View style={styles.checkboxSection}>
                {equipmentOptions.map((option: {id: string, name: string}, index: number) => {
                    return (
                        <View key={index} style={styles.singleCheckBox}>
                            <CheckBox
                                style={styles.checkbox}
                                value={selectedEquipment.includes(option.id)}
                                color={
                                    selectedEquipment.includes(option.id)
                                        ? Colors.secondary
                                        : undefined
                                }
                                onValueChange={() => {
                                    setSelectedEquipment((prevState) =>
                                        prevState.includes(option.id)
                                            ? prevState.filter(
                                                  (item) => item !== option.id
                                              )
                                            : [...prevState, option.id]
                                    )
                                }}
                            />
                            <Text style={styles.label}>{option.name}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.container}>
                <Text style={Styles.h2}>Minimalna liczba miejsc:</Text>
                <TextInput
                    style={styles.input}
                    value={minNumberOfSeats.toString()}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
            <Text style={Styles.h2}>Dostępne pokoje:</Text>
            <View style={styles.availableRoomsContainer}>
                {availableRooms.map((room, index) => {
                    return (
                        <TouchableOpacity
                            style={styles.availableRoom}
                            key={index}
                            onPress={() => {
                                setSelectedRoom(room)
                                setScrollAvailable(false)
                            }}
                        >
                            <Text style={styles.label}>{room.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {availableRooms.length === 0 && (
                <Text style={Styles.h2}>Brak dostępnych pokoi</Text>
            )}
            {selectedRoom && (
                <CompleteReservationPopUp
                    setSelectedRoom={setSelectedRoom}
                    setScrollAvailable={setScrollAvailable}
                    room={selectedRoom}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSection: {
        flexDirection: 'column',
        marginRight: 30,
    },
    singleCheckBox: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
        width: 35,
        height: 35,
        borderColor: Colors.primary,
        borderRadius: 10,
        backgroundColor: Colors.primary,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 8,
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 4,
        color: Colors.primary,
        backgroundColor: Colors.secondary,
    },
    availableRoomsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 25,
    },
    availableRoom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: Colors.secondary,
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import CheckBox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '@/constants/Colors'
import TimePicker from './TimePicker'
import { DayReservation, Room } from '@/app/(tabs)/reservation/newReservation'
import Animated from 'react-native-reanimated'
import Dropdown from './Dropdown'
import { router } from 'expo-router'

type Reservation = {
    name: string
    type: string
    userId: number
    date: string
    startTime: string
    endTime: string
    classroomId: number
}

type CompleteReservationPopUpProps = {
    setSelectedRoom: (room: Room | null) => void
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
    room: Room
    date: Date | null
    startTime: string
    endTime: string
}

async function fetchReservationTypes() {
    // const response = await fetch('http://localhost:3000/reservationTypes')
    // const data = await response.json()
    let data = ['Kolokwium', 'Konsultacje', 'Spotkanie', 'Inne']
    return data
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
    const [reservationTypes, setReservationTypes] = useState<string[]>([])
    const [selectedReservationType, setSelectedReservationType] = useState(
        'Wybierz typ rezerwacji'
    )

    useEffect(() => {
        const fetchData = async () => {
            setReservationTypes(await fetchReservationTypes())
        }
        fetchData()
        setScrollAvailable(false)
    }, [])

    const handleSubmit = () => {
        console.log('submit', selectedReservationType)
        if (selectedReservationType === 'Wybierz typ rezerwacji') {
            return
        }
        const reservation: Reservation = {
            type: selectedReservationType,
            name: name,
            userId: 1,
            date: date?.toISOString().split('T')[0] || '',
            startTime: startTime,
            endTime: endTime,
            classroomId: room.id,
        }
        console.log(reservation)
        setName('')
        setSelectedReservationType('Wybierz typ rezerwacji')
        setScrollAvailable(true)
        setSelectedRoom(null)
        router.navigate('reservation')
    }

    return (
        <View
            style={styles.container}
        >
            <View style={styles.flex}>
                <View style={styles.box}>
                    <TextInput
                        placeholder="Nazwa rezerwacji"
                        onChangeText={setName}
                        value={name}
                        style={styles.input}
                        placeholderTextColor={Colors.secondary}
                    />
                    <View style={{ zIndex: 2 }}>
                        <Dropdown
                            options={reservationTypes}
                            selected={selectedReservationType}
                            setSelected={setSelectedReservationType}
                            isOpen={isDropDownOpen}
                            setIsOpen={setIsDropDownOpen}
                        />
                    </View>
                    {date && (
                        <Text>{date?.toISOString().split('T')[0] || ''}</Text>
                    )}
                    <Text>
                        {startTime} - {endTime}
                    </Text>
                    <Text>{room.name}</Text>
                    <Text>{room.capacity} miejsc</Text>
                    <Text>{room.equipment.join(', ')}</Text>
                    {selectedReservationType === 'Wybierz typ rezerwacji' && (
                        <Text style={styles.error}>Wybierz typ rezerwacji</Text>
                    )}
                    {name === '' && (
                        <Text style={styles.error}>Podaj nazwę rezerwacji</Text>
                    )}
                    {name !== '' &&
                        selectedReservationType !==
                            'Wybierz typ rezerwacji' && (
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.submit}
                            >
                                <Text style={styles.label}>Rezerwuj</Text>
                            </TouchableOpacity>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: 733,
        backgroundColor: Colors.primary + '80',
        zIndex: 1,
        bottom: '0%',
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

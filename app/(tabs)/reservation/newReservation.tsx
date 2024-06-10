import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import React, { useEffect, useState } from 'react'
import RoomDropdown from '@/components/RoomDropdown'
import TimePicker from '@/components/TimePicker'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import { router } from 'expo-router'
import RoomAvailabilitySection from '@/components/RoomAvailabilitySection'
import SearchByTermSection from '@/components/SearchByTermSection'

type RooomReservation = {
    id: number
    name: string
}

export type DayReservation = {
    id: number
    type: string
    startTime: string
    endTime: string
    classroom: RooomReservation
}

export type Room = {
    id: number
    name: string
    capacity: number
    equipment: string[]
}

async function getReservations() {
    // const response = await fetch('http://localhost:3000/reservations')
    // const data = await response.json()
    let data: DayReservation[] = [
        {
            id: 1,
            type: 'Kolokwium ASD',
            startTime: '12:00',
            endTime: '13:00',
            classroom: { id: 1, name: '1.38' },
        },
        {
            id: 2,
            type: 'Konsultacje',
            startTime: '14:00',
            endTime: '15:00',
            classroom: { id: 2, name: '2.41' },
        },
        {
            id: 3,
            type: 'Spotkanie',
            startTime: '15:00',
            endTime: '16:00',
            classroom: { id: 1, name: '1.38' },
        },
        {
            id: 4,
            type: 'Inne',
            startTime: '16:00',
            endTime: '17:00',
            classroom: { id: 2, name: '2.41' },
        },
        {
            id: 5,
            type: 'Kolokwium ASD',
            startTime: '16:00',
            endTime: '17:00',
            classroom: { id: 1, name: '1.38' },
        },
        {
            id: 6,
            type: 'Konsultacje',
            startTime: '12:30',
            endTime: '18:30',
            classroom: { id: 3, name: '3.14' },
        }
    ]
    return data
}

async function fetchRooms() {
    // const response = await fetch('http://localhost:3000/classrooms')
    // const data = await response.json()
    let data: Room[] = [
        {
            id: 1,
            name: '1.38',
            capacity: 20,
            equipment: ['Komputery'],
        },
        {
            id: 2,
            name: '2.41',
            capacity: 30,
            equipment: ['Komputery', 'Projektor'],
        },
        {
            id: 3,
            name: '3.14',
            capacity: 25,
            equipment: ['Projektor'],
        },
        {
            id: 4,
            name: '4.20',
            capacity: 15,
            equipment: ['Komputery'],
        }
    ]
    return data
}

export default function newReservation() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const [reservations, setReservations] = useState<DayReservation[]>([])
    const [rooms, setRooms] = useState<Room[]>([])

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [roomSectionOpen, setRoomSectionOpen] = useState(false)
    const [termSectionOpen, setTimeSectionOpen] = useState(false)

    const [scrollAvailable, setScrollAvailable] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setRooms(await fetchRooms())
        }
        fetchData()
    }, [])

    async function onDateChange(date: Date) {
        setSelectedDate(date)
        setButtonsVisible(true)
        setReservations(await getReservations())
    }

    function handleRoomSection() {
        setTimeSectionOpen(false)
        setRoomSectionOpen(true)
    }

    function handleTimeSection() {
        setRoomSectionOpen(false)
        setTimeSectionOpen(true)
    }

    return (
        <ScrollView style={styles.background} scrollEnabled={scrollAvailable}>
            <SafeAreaView style={Styles.background}>
                <Text style={[Styles.h1, styles.h1]}>Nowa rezerwacja</Text>
                <Calendar onDateChange={onDateChange} />

                {!buttonsVisible && (
                    <Text style={Styles.h2}>Wybierz datę, aby kontynuować</Text>
                )}

                {buttonsVisible && (
                    <View style={styles.buttons}>
                        <OrangeButton
                            text="Wybieraj po salach"
                            onPress={handleRoomSection}
                            textClassName={{
                                textAlign: 'center',
                                color: Colors.primary,
                            }}
                            buttonStyle={{ width: 170, alignContent: 'center' }}
                        />
                        <OrangeButton
                            text="Wybieraj po godzinach"
                            onPress={handleTimeSection}
                            textClassName={{
                                textAlign: 'center',
                                color: Colors.primary,
                            }}
                            buttonStyle={{ width: 170 }}
                        />
                    </View>
                )}

                {roomSectionOpen && (
                    <RoomAvailabilitySection
                        reservations={reservations}
                        rooms={rooms}
                        date={selectedDate}
                        setScrollAvailable={setScrollAvailable}
                    />
                )}

                {termSectionOpen && (
                    <SearchByTermSection
                        reservations={reservations}
                        rooms={rooms}
                        date={selectedDate}
                        setScrollAvailable={setScrollAvailable}
                    />
                )}

                {/* <RoomDropdown setSelectedRooms={setSelectedRooms} />
                <TimePicker
                    startTime={startTime}
                    endTime={endTime}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                /> */}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    h1: {
        marginTop: -50,
    },
    background: {
        backgroundColor: Colors.mapGrey,
        paddingBottom: 50,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '90%',
    },
})

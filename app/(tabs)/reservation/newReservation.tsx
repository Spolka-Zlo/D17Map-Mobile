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

export type Reservation = {
    room: string
    name: string
    date: string
    startTime: string
    endTime: string
}

export type Room = {
    name: string
    numberOfSeats: number
    equipment: string[]
}

async function getReservations() {
    // const response = await fetch('http://localhost:3000/reservations')
    // const data = await response.json()
    let data: Reservation[] = [
        {
            room: '1.38',
            name: 'Kolokwium ASD',
            date: '2024-05-31',
            startTime: '12:00',
            endTime: '13:00',
        },
        {
            room: '2.41',
            name: 'Konsultacje z ASD',
            date: '2024-05-31',
            startTime: '14:00',
            endTime: '15:00',
        },
        {
            room: '1.38',
            name: 'Spotkanie klubu studentów',
            date: '2024-05-31',
            startTime: '16:00',
            endTime: '17:00',
        },
        {
            room: '2.41',
            name: 'Kolokwium ASD',
            date: '2024-05-31',
            startTime: '14:00',
            endTime: '16:00',
        },
        {
            room: '1.38',
            name: 'Konsultacje z ASD',
            date: '2024-05-31',
            startTime: '14:00',
            endTime: '15:00',
        },
        {
            room: '2.41',
            name: 'Spotkanie klubu studentów',
            date: '2024-05-31',
            startTime: '7:00',
            endTime: '13:00',
        },
    ]
    return data
}

async function fetchRooms() {
    // const response = await fetch('http://localhost:3000/rooms')
    // const data = await response.json()
    let data: Room[] = [
        {
            name: '1.38',
            numberOfSeats: 20,
            equipment: ['Komputery'],
        },
        {
            name: '2.41',
            numberOfSeats: 30,
            equipment: ['Komputery', 'Projektor'],
        },
    ]
    return data
}

export default function newReservation() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const [reservations, setReservations] = useState<Reservation[]>([])
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

                {roomSectionOpen && <RoomAvailabilitySection />}

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

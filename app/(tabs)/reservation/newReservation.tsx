import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Pressable,
    Touchable,
    TouchableOpacity,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import RoomAvailabilitySection from '@/components/RoomAvailabilitySection'
import SearchByTermSection from '@/components/SearchByTermSection'
import { ipaddress } from '@/constants/IP'

type RooomReservation = {
    id: string
    name: string
}

export type DayReservation = {
    id: string
    type: string
    startTime: string
    endTime: string
    classroom: RooomReservation
}

export type Room = {
    id: string
    name: string
    capacity: number
    equipment: string[]
}

async function getReservations(date: Date) {
    try {
        let day = date.toISOString().split('T')[0]
        const response = await fetch(ipaddress + 'reservations?day=' + day)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch (error) {
        console.error(error)
    }
}

async function fetchRooms() {
    try {
        const response = await fetch(ipaddress + 'classrooms')
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error(error)
    }
    return []
}

export default function newReservation() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const [reservations, setReservations] = useState<DayReservation[]>([])
    const [rooms, setRooms] = useState<Room[]>([])

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [roomSectionOpen, setRoomSectionOpen] = useState(false)
    const [termSectionOpen, setTimeSectionOpen] = useState(false)

    const [scrollAvailable, setScrollAvailable] = useState(true)
    const scrollViewRef = useRef<ScrollView>(null)

    useEffect(() => {
        const fetchData = async () => {
            setRooms(await fetchRooms())
        }
        fetchData()
    }, [])

    async function onDateChange(date: Date) {
        setSelectedDate(date)
        setButtonsVisible(true)
        setReservations(await getReservations(date))
    }

    function handleRoomSection() {
        setTimeSectionOpen(false)
        setRoomSectionOpen(true)
        scrollToPosition(378)
    }

    function handleTimeSection() {
        setRoomSectionOpen(false)
        setTimeSectionOpen(true)
    }

    function scrollToPosition(position: number) {
        scrollViewRef.current?.scrollTo({ y: position, animated: true })
    }

    return (
        <ScrollView
            style={styles.background}
            scrollEnabled={scrollAvailable}
            ref={scrollViewRef}
        >
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

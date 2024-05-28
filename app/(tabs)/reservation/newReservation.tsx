import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import React, { useState } from 'react'
import RoomDropdown from '@/components/RoomDropdown'
import TimePicker from '@/components/TimePicker'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import { router } from 'expo-router'
import { Reservation } from '.'
import RoomAvailabilitySection from '@/components/RoomAvailabilitySection'
import SearchByTermSection from '@/components/SearchByTermSection'

async function getReservations() {
    const response = await fetch('http://localhost:3000/reservations')
    const data = await response.json()
    return data
}

export default function Reservations() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')

    const [reservations, setReservations] = useState<Reservation[]>([])

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [roomPopupOpen, setRoomPopupOpen] = useState(false)
    const [termPopupOpen, setTimePopupOpen] = useState(false)

    async function onDateChange(date: Date) {
        setSelectedDate(date)
        setButtonsVisible(true)
        // setReservations(await getReservations())
    }

    function handleRoomPopup() {
        setTimePopupOpen(false)
        setRoomPopupOpen(true)
    }

    function handleTimePopup() {
        setRoomPopupOpen(false)
        setTimePopupOpen(true)
    }

    return (
        <ScrollView style={styles.background}>
            <SafeAreaView style={Styles.background}>
                <Text style={[Styles.h1, styles.h1]}>Nowa rezerwacja</Text>
                <Calendar onDateChange={onDateChange} />

                {!buttonsVisible && (
                    <Text style={Styles.h2}>
                        Wybierz datę, aby kontynuować
                    </Text>
                )}

                {buttonsVisible && (
                    <View style={styles.buttons}>
                        <OrangeButton
                            text="Wybieraj po salach"
                            onPress={handleRoomPopup}
                            textClassName={{textAlign: 'center', color:Colors.primary}}
                            buttonStyle={{width: 170, alignContent: 'center'}}
                        />
                        <OrangeButton
                            text="Wybieraj po godzinach"
                            onPress={handleTimePopup}
                            textClassName={{textAlign: 'center', color:Colors.primary}}
                            buttonStyle={{width: 170}}
                        />
                    </View>
                )}

                {roomPopupOpen && (
                    <RoomAvailabilitySection/>
                )}

                {termPopupOpen && (
                    <SearchByTermSection/>
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

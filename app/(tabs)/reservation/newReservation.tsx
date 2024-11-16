import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import React, { useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import RoomAvailabilitySection from '@/components/RoomAvailabilitySection'
import SearchByTermSection from '@/components/SearchByTermSection'

import { useClassrooms } from '@/services/classroomService'
import { useDayReservations } from '@/services/reservationService'
import InfoModal from '@/components/InfoModal'
import { router } from 'expo-router'
import { Spinner } from '@/components/Spinner'

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

export default function newReservation() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const { rooms, isRoomsError, isRoomsLoading } = useClassrooms()
    const { reservations, isReservationsError, isReservationsLoading } =
        useDayReservations(selectedDate)

    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [roomSectionOpen, setRoomSectionOpen] = useState(false)
    const [termSectionOpen, setTimeSectionOpen] = useState(false)

    const [scrollAvailable, setScrollAvailable] = useState(true)
    const scrollViewRef = useRef<ScrollView>(null)

    function onDateChange(date: Date) {
        setSelectedDate(date)
        setButtonsVisible(true)
    }

    function handleRoomSection() {
        setTimeSectionOpen(false)
        setRoomSectionOpen(true)
        scrollToPosition(378)
    }

    function handleTimeSection() {
        setRoomSectionOpen(false)
        setTimeSectionOpen(true)
        scrollToPosition(378)
    }

    function scrollToPosition(position: number) {
        scrollViewRef.current?.scrollTo({ y: position, animated: true })
    }

    return (
        <>
            <Spinner
                isLoading={isRoomsLoading || isReservationsLoading}
                text={'Ładowanie...'}
            />
            <ScrollView
                style={styles.background}
                scrollEnabled={scrollAvailable}
                ref={scrollViewRef}
            >
                <InfoModal
                    text="Wystąpił błąd po stronie serwera"
                    visible={isRoomsError || isReservationsError}
                    onClose={() => {
                        router.back()
                    }}
                />
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
                                onPress={handleRoomSection}
                                textClassName={{
                                    textAlign: 'center',
                                    color: Colors.primary,
                                }}
                                buttonStyle={{
                                    width: 170,
                                    alignContent: 'center',
                                }}
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
        </>
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

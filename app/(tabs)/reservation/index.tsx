import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Link, router } from 'expo-router'
import { Styles } from '@/constants/Styles'
import ReservationList from './components/ReservationList'
import ReservationManager from './components/ReservationManager'
import { useState } from 'react'
import { OrangeAddButton } from '@/components/OrangeAddButton'

export type Reservation = {
    id: number
    room: string
    name: string
    date: string
    startTime: string
    endTime: string
    type: ReservationType
}

enum ReservationType {
    CLASS,
    EXAM,
    TEST,
    CONSULTATIONS,
    CONFERENE,
    STUDENTS_CLUB_MEETING,
}

export default function Reservations() {
    console.log('TabReservationsScreen')
    const reservations: Reservation[] = [
        {
            id: 1,
            room: 'sala 1',
            name: 'Kolokwium ASD',
            date: '2022-01-01',
            startTime: '12:00',
            endTime: '13:00',
            type: ReservationType.TEST,
        },
        {
            id: 2,
            room: 'sala 1',
            name: 'Konsultacje z ASD',
            date: '2022-01-01',
            startTime: '14:00',
            endTime: '15:00',
            type: ReservationType.CONSULTATIONS,
        },
        {
            id: 3,
            room: 'sala 1',
            name: 'Spotkanie klubu studentów',
            date: '2022-01-01',
            startTime: '16:00',
            endTime: '17:00',
            type: ReservationType.STUDENTS_CLUB_MEETING,
        },
        {
            id: 4,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '18:00',
            endTime: '19:00',
            type: ReservationType.CLASS,
        },
        {
            id: 5,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '20:00',
            endTime: '21:00',
            type: ReservationType.CLASS,
        },
        {
            id: 6,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '22:00',
            endTime: '23:00',
            type: ReservationType.CLASS,
        },
        {
            id: 7,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '00:00',
            endTime: '01:00',
            type: ReservationType.CLASS,
        },
        {
            id: 8,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '02:00',
            endTime: '03:00',
            type: ReservationType.CLASS,
        },
        {
            id: 9,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '04:00',
            endTime: '05:00',
            type: ReservationType.CLASS,
        },
        {
            id: 10,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '06:00',
            endTime: '07:00',
            type: ReservationType.CLASS,
        },
        {
            id: 11,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '08:00',
            endTime: '09:00',
            type: ReservationType.CLASS,
        },
        {
            id: 12,
            room: 'sala 1',
            name: 'Wykład z ASD',
            date: '2022-01-01',
            startTime: '10:00',
            endTime: '11:00',
            type: ReservationType.CLASS,
        },
    ]
    const [reservation, setReservation] = useState<Reservation | null>(null)
    return (
        <View onTouchStart={() => setReservation(null)}>
            <ScrollView>
                <View style={Styles.background}>
                    <Text style={[Styles.h1, styles.title]}>
                        Twoje Rezerwacje
                    </Text>
                    <ReservationList reservations={reservations} setReservation={setReservation} />
                </View>
            </ScrollView>
            {reservation && (
                <ReservationManager
                    reservation={reservation}
                    setReservation={setReservation}
                />
            )}
            <OrangeAddButton onPress={
                () => {
                    router.push('/reservation/newReservation')
                }
            } />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 16,
    },
})

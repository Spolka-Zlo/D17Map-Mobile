import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Styles } from '@/constants/Styles'
import ReservationList from './components/ReservationList'
import ReservationManager from './components/ReservationManager'
import { OrangeAddButton } from '@/components/OrangeAddButton'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect, useState } from 'react'
import { useUserFutureReservations } from '@/services/reservationService'
export type Reservation = {
    id: number
    room: string
    title: string
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
    const { authState } = useAuth();
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const { data: reservations = [], isLoading, isError } = useUserFutureReservations(authState?.userId ?? 0);

    if (isError) {
        return (
            <View style={Styles.background}>
                <Text>Error fetching reservations</Text>
            </View>
        )
    }

    return (
        <View
            onTouchStart={() => setReservation(null)}
            style={Styles.background}
        >
            <ScrollView>
            {/* <Spinner visible={isLoading} textContent='Ładowanie rezerwacji' /> */}
                <View style={Styles.background}>
                    <Text style={[Styles.h1, styles.title]}>
                        Twoje Rezerwacje
                    </Text>
                    <ReservationList
                        reservations={reservations}
                        setReservation={setReservation}
                    />
                </View>
            </ScrollView>
            {reservation && (
                <ReservationManager
                    reservation={reservation}
                    setReservation={setReservation}
                />
            )}
            <OrangeAddButton
                onPress={() => {
                    router.push('/reservation/newReservation')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 16,
    },
})

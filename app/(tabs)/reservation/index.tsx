import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Link, router } from 'expo-router'
import { Styles } from '@/constants/Styles'
import ReservationList from './components/ReservationList'
import ReservationManager from './components/ReservationManager'
import { useCallback, useEffect, useState } from 'react'
import { OrangeAddButton } from '@/components/OrangeAddButton'
import { useAuth } from '@/providers/AuthProvider'
import { ipaddress } from '@/constants/IP'
import { useFocusEffect } from '@react-navigation/native'

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

const getUserReservations = async (userId: number, token: string) => {
    const response = await fetch(`${ipaddress}users/${userId}/future-reservations/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    const data = await response.json()
    return data
}

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const authState = useAuth()
    
    const fetchReservations = async () => {
        let userId = authState.authState?.userId
        let token = authState.authState?.token
        if (userId && token) {
            const data = await getUserReservations(userId, token)
            setReservations(data)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchReservations()
        }, [])
    )

    const [reservation, setReservation] = useState<Reservation | null>(null)
    return (
        <View
            onTouchStart={() => setReservation(null)}
            style={Styles.background}
        >
            <ScrollView>
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

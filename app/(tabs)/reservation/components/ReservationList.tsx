import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Reservation } from '..'
import { useState } from 'react'
import ListElement from '@/components/ListElement'
import Colors from '@/constants/Colors'
import ReservationManager from './ReservationManager'

type ReservationListProps = {
    reservations: Reservation[],
    setReservation: (reservation: Reservation) => void
}

export default function ReservationList({
    reservations,
    setReservation,
}: ReservationListProps) {
    return (
        <View>
            <ScrollView>
            <View style={styles.container}>
            {reservations.map((reservation) => (
                <ListElement
                key={reservation.id}
                text={`${reservation.name} - ${reservation.date} ${reservation.startTime}-${reservation.endTime}`}
                onPress={() => setReservation(reservation)}
                textStyle={{ fontSize: 16, color: Colors.secondary}}
                />
            ))}
        </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

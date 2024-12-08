import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { ReservationWithClassRoomInfo } from '@/constants/types'
import { Styles } from '@/constants/Styles'
import ReservationList from './reservation/components/ReservationList'
import { useFutureEvents } from '@/services/eventsService'
import { Spinner } from '@/components/Spinner'
import EventManager from '@/components/reservation_components/EventManager'

export default function TabOneScreen() {
    const [reservation, setReservation] =
        useState<ReservationWithClassRoomInfo | null>(null)
    const { events, isEventsError, isEventsLoading, refreshEvents } =
        useFutureEvents()

    useEffect(() => {
        console.log('Refreshing events')
        refreshEvents()
    }, [])

    const renderContent = () => {
        if (isEventsLoading) {
            return null
        }

        if (events.length === 0 && !isEventsError) {
            return <Text>Brak zaplanowanych wydarzeń</Text>
        }

        if (isEventsError && events.length == 0) {
            return (
                <Text>
                    Nie udało się załadować wydarzeń, spróbuj ponownie za
                    chwilę.
                </Text>
            )
        }

        return (
            <ReservationList
                reservations={events}
                setReservation={setReservation}
            />
        )
    }

    return (
        <>
            <Spinner isLoading={isEventsLoading} />
            <View
                onTouchStart={() => setReservation(null)}
                style={Styles.background}
            >
                <ScrollView style={styles.scroll}>
                    <View style={[Styles.background, { width: '100%' }]}>
                        <Text style={[Styles.h1, styles.title]}>
                            Nadchodzące wydarzenia w budynku D-17
                        </Text>
                        {renderContent()}
                    </View>
                </ScrollView>
                {reservation && (
                    <EventManager
                        reservation={reservation}
                        setReservation={setReservation}
                    />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center',
        padding: 10,
    },
    scroll: {
        width: '100%',
    },
})

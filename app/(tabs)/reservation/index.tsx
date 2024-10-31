import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Styles } from '@/constants/Styles'
import ReservationList from './components/ReservationList'
import ReservationManager from './components/ReservationManager'
import { OrangeAddButton } from '@/components/OrangeAddButton'
import { useState } from 'react'
import { useUserFutureReservations } from '@/services/reservationService'
import InfoModal from '@/components/InfoModal'
import Spinner from 'react-native-loading-spinner-overlay'
import { SimpleReservation } from '@/constants/types'



export default function Reservations() {
    const [reservation, setReservation] = useState<SimpleReservation | null>(null)
    const {
        reservations = [],
        isReservationLoading,
        isReservationError,
    } = useUserFutureReservations()

    return (
        <View
            onTouchStart={() => setReservation(null)}
            style={Styles.background}
        >
            <ScrollView style={styles.scroll}>
                <Spinner visible={isReservationLoading} textContent='Ładowanie rezerwacji' />
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
            <InfoModal
                text="Wystąpił błąd po stronie serwera. Spróbuj ponownie później."
                visible={isReservationError}
                onClose={() => {router.back()}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 16,
    },
    scroll: {
        width: '100%',
    },
})

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { Styles } from '@/constants/Styles'
import ReservationList from './components/ReservationList'
import ReservationManager from './components/ReservationManager'
import { OrangeAddButton } from '@/components/OrangeAddButton'
import { useCallback, useState } from 'react'
import { useUserFutureReservations } from '@/services/reservationService'
import InfoModal from '@/components/InfoModal'

import { ReservationWithClassRoomInfo } from '@/constants/types'
import { Spinner } from '@/components/Spinner'
import { useAuth } from '@/providers/AuthProvider'

export default function Reservations() {
    const [reservation, setReservation] =
        useState<ReservationWithClassRoomInfo | null>(null)
    const {
        reservations = [],
        isReservationLoading,
        isReservationError,
    } = useUserFutureReservations()

    const { onLogout } = useAuth()
    
    const [hasFocus, setHasFocus] = useState(false)
    
    useFocusEffect(
        useCallback(() => {
            setHasFocus(true)
            return () => {
                setHasFocus(false)
            }
        }, [])
    )

    const handleModalClose = () => {
        onLogout()
        router.push('/auth/loginPage')
    }
    
    if (!hasFocus) {
        return null
    }

    return (
        <>
            <Spinner
                isLoading={isReservationLoading}
                text="Ładowanie rezerwacji"
            />
            <View
                onTouchStart={() => setReservation(null)}
                style={Styles.background}
            >
                <ScrollView style={styles.scroll}>
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
                    onClose={handleModalClose}
                />
            </View>
        </>
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

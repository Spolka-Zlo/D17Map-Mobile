import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
} from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Colors from '@/constants/Colors'
import { ReservationWithClassRoomInfo } from '@/constants/types'
import { Styles } from '@/constants/Styles'
import ReservationList from './reservation/components/ReservationList'
import { useFutureEvents } from '@/services/eventsService'
import { Spinner } from '@/components/Spinner'
import EventManager from '@/components/reservation_components/EventManager'

export default function TabOneScreen() {
    const { setApiUrl } = useAuth()

    const [ip, setIp] = useState('')

    const handleChangeIp = async () => {
        await setApiUrl(ip)
        alert('Zmieniono adres IP')
    }
    const [reservation, setReservation] =
        useState<ReservationWithClassRoomInfo | null>(null)
    const { events = [], isEventsError, isEventsLoading } = useFutureEvents()

    return (
        <>
            <Spinner isLoading={isEventsLoading} />
            <View
                onTouchStart={() => setReservation(null)}
                style={Styles.background}
            >
                <ScrollView style={styles.scroll}>
                    <View style={Styles.background}>
                        <Text style={[Styles.h1, styles.title]}>
                            Nadchodzące wydarzenia w budynku D-17
                        </Text>
                        {isEventsError && (
                            <Text>
                                Nie udało się załadować wydarzeń, spróbuj
                                ponownie za chwilę.
                            </Text>
                        )}
                        <ReservationList
                            reservations={events}
                            setReservation={setReservation}
                        />
                    </View>
                </ScrollView>
                <TextInput
                    value={ip}
                    onChangeText={setIp}
                    placeholder="Podaj nowy adres IP"
                    style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                />
                <Button title="Zmień adres IP" onPress={handleChangeIp} />
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mapGrey,
    },
    title: {
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center',
        padding: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    scroll: {
        width: '100%',
    },
})

import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'
import { ReservationWithClassRoomInfo } from '@/constants/types'
import { Styles } from '@/constants/Styles'
import Spinner from 'react-native-loading-spinner-overlay'
import ReservationList from './reservation/components/ReservationList'
import ReservationManager from './reservation/components/ReservationManager'
import InfoModal from '@/components/InfoModal'
import { useFutureEvents } from '@/services/eventsService'

export default function TabOneScreen() {
    const { setApiUrl } = useAuth()

    const [ip, setIp] = useState('');

    const handleChangeIp = async () => {
        await setApiUrl(ip);
        alert('Zmieniono adres IP');
    };
    const [reservation, setReservation] = useState<ReservationWithClassRoomInfo | null>(null)
    const { events = [], isEventsError, isEventsLoading } = useFutureEvents()

    return (
        <View
            onTouchStart={() => setReservation(null)}
            style={Styles.background}
        >
            <TextInput
                value={ip}
                onChangeText={setIp}
                placeholder="Podaj nowy adres IP"
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />
            <Button title="Zmień adres IP" onPress={handleChangeIp} />
            <ScrollView style={styles.scroll}>
                <Spinner visible={isEventsLoading} textContent='Ładowanie wydarzeń' />
                <View style={Styles.background}>
                    <Text style={[Styles.h1, styles.title]}>
                        Nadchodzące wydarzenia
                    </Text>
                    {isEventsError && (
                        <Text>
                            Nie udało się załadować wydarzeń, spróbuj ponownie za chwilę.
                        </Text>
                    )}
                    <ReservationList
                        reservations={events}
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
        </View>
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
        fontSize: 20,
        fontWeight: 'bold',
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

import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar';
import { useState } from 'react';
import RoomDropdown from '@/components/RoomDropdown';

export default function Reservations() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])

    return (
        <SafeAreaView style={Styles.background}>
            <Text style={[Styles.h1, styles.h1]}>Nowa rezerwacja</Text>
            <Calendar setSelectedDate={setSelectedDate} />
            <Text>{selectedDate.toDateString()}</Text>
            <Text>{selectedRooms}</Text>
            <RoomDropdown setSelectedRooms={setSelectedRooms} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    h1: {
        marginTop: -50,
    },
})

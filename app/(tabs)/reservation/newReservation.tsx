import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Button,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import { useState } from 'react'
import RoomDropdown from '@/components/RoomDropdown'
import TimePicker from '@/components/TimePicker'
import Colors from '@/constants/Colors'

export default function Reservations() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')

    return (
        <ScrollView style={styles.background}>
            <SafeAreaView style={Styles.background}>
                <Text style={[Styles.h1, styles.h1]}>Nowa rezerwacja</Text>
                <Calendar setSelectedDate={setSelectedDate} />
                <Text>{selectedDate.toDateString()}</Text>
                <Text>{selectedRooms}</Text>
                <RoomDropdown setSelectedRooms={setSelectedRooms} />
                <TimePicker
                    startTime={startTime}
                    endTime={endTime}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                />
                <Text>{startTime}</Text>
                <Text>{endTime}</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    h1: {
        marginTop: -50,
    },
    background: {
        backgroundColor: Colors.mapGrey,
    },
})

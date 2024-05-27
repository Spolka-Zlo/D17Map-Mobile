import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import { useState } from 'react'
import RoomDropdown from '@/components/RoomDropdown'
import TimePicker from '@/components/TimePicker'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import { router } from 'expo-router'

export default function Reservations() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')

    const isDateSelected = selectedDate !== null
    const isTimeSelected = startTime !== '' && endTime !== ''
    const isValidTimeRange = startTime < endTime
    const isRoomSelected = selectedRooms.length > 0

    const renderMessage = () => {
        let text: string = ''
        if (!isDateSelected) {
            text = 'Proszę wybrać datę.'
        }
        else if (!isTimeSelected) {
            text = 'Proszę wybrać godziny.'
        }
        else if (!isValidTimeRange) {
            text =
                'Godzina rozpoczęcia musi być wcześniejsza niż godzina zakończenia.'
        }
        else if (!isRoomSelected) {
            text = 'Proszę wybrać salę.'
        }
        else if (text === '') {
            return null
        }
        return <Text style={styles.error}>{text}</Text>
    }

    const handleReservation = () => {
        const formattedDate = selectedDate
            ? selectedDate.toISOString().split('T')[0]
            : ''
        router.push(
            '/reservation/completeReservation?date=' +
                formattedDate +
                '&rooms=' +
                selectedRooms.join(',') +
                '&startTime=' +
                startTime +
                '&endTime=' +
                endTime
        )
    }

    return (
        <ScrollView style={styles.background}>
            <SafeAreaView style={Styles.background}>
                <Text style={[Styles.h1, styles.h1]}>Nowa rezerwacja</Text>
                <Calendar setSelectedDate={setSelectedDate} />
                <RoomDropdown setSelectedRooms={setSelectedRooms} />
                <TimePicker
                    startTime={startTime}
                    endTime={endTime}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                />

                {renderMessage()}

                {isDateSelected &&
                    isTimeSelected &&
                    isValidTimeRange &&
                    isRoomSelected && (
                        <View style={{ paddingBottom: 50 }}>
                            <OrangeButton
                                text="Wyszukaj rezerwację"
                                onPress={handleReservation}
                            />
                        </View>
                    )}
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
        paddingBottom: 50,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
})

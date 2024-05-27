import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import { useEffect, useState } from 'react'
import RoomDropdown from '@/components/RoomDropdown'
import TimePicker from '@/components/TimePicker'
import Colors from '@/constants/Colors'
import { OrangeButton } from '@/components/OrangeButton'
import { useLocalSearchParams } from 'expo-router'

type completeReservationProps = {
    date: string
    rooms: string
    startTime: string
    endTime: string
}

export default function completeReservation(
) {
    const { date, rooms, startTime, endTime } =
        useLocalSearchParams<completeReservationProps>()
    console.log(date)

    useEffect(() => {
        // pobranie danych z serwera na podstawie date, rooms, startTime, endTime
        // musimy je wyświetlić oraz móc je zarezerwować
        
    }, [date])

    return (
        <View style={styles.background}>
            <Text>completeReservation</Text>
            <Text>{date}</Text>
            <Text>{rooms}</Text>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.mapGrey,
    },
})

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import RoomDropdown from './RoomDropdown'
import TimeSlotPicker from './TimeSlotPicker'

export default function RoomAvailabilitySection() {
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])

    return (
        <View style={styles.background}>
            <RoomDropdown setSelectedRooms={setSelectedRooms} />
            {/* dodaj tutaj ten komponent */}
            <TimeSlotPicker />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.mapGrey,
        width: '100%',
    },
})

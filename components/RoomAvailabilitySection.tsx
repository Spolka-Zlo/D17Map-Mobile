import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from '@/components/Calendar'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import RoomDropdown from './RoomDropdown'
import TimeSlotPicker from './TimeSlotPicker'
import { DayReservation, Room } from '@/app/(tabs)/reservation/newReservation'

type RoomAvailabilitySectionProps = {
    reservations: DayReservation[]
    rooms: Room[]
    date: Date | null
}

export default function RoomAvailabilitySection({
    reservations,
    rooms,
    date,
}: RoomAvailabilitySectionProps) {
    const [selectedRoomsId, setSelectedRoomsId] = useState<number[]>([])

    return (
        <View style={styles.background}>
            <RoomDropdown setSelectedRooms={setSelectedRoomsId} rooms={rooms} />
            <TimeSlotPicker reservations={reservations} selectedRoomsId={selectedRoomsId} />
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

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import RoomDropdown from './RoomDropdown'
import TimeSlotPicker from './TimeSlotPicker'
import { DayReservation, Room } from '@/app/(tabs)/reservation/newReservation'
import CompleteReservationPopUp from './CompleteReservationPopUp'

type RoomAvailabilitySectionProps = {
    reservations: DayReservation[]
    rooms: Room[]
    date: Date | null
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RoomAvailabilitySection({
    reservations,
    rooms,
    date,
    setScrollAvailable,
}: RoomAvailabilitySectionProps) {
    const [selectedRoomsId, setSelectedRoomsId] = useState<number[]>([])
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

    return (
        <View style={styles.background}>
            <RoomDropdown
                setSelectedRooms={setSelectedRoomsId}
                selectedRooms={selectedRoomsId}
                rooms={rooms}
            />
            {selectedRoomsId.length > 0 && (
                <TimeSlotPicker
                    reservations={reservations}
                    selectedRoomsId={selectedRoomsId}
                    rooms={rooms}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    setSelectedRoom={setSelectedRoom}
                />
            )}
            {selectedRoom && (
                <CompleteReservationPopUp
                    setSelectedRoom={setSelectedRoom}
                    setScrollAvailable={setScrollAvailable}
                    room={selectedRoom}
                    date={date}
                    startTime={startTime}
                    endTime={endTime}
                />
            )}
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

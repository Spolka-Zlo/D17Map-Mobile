import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import RoomDropdown from './RoomDropdown'
import TimeSlotPicker from './TimeSlotPicker'
import { DayReservation } from '@/app/(tabs)/reservation/newReservation'
import CompleteReservationPopUp from './CompleteReservationPopUp'
import { Room } from '@/constants/types'

type RoomAvailabilitySectionProps = {
    reservations: DayReservation[]
    rooms: Room[]
    date: Date | null
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RoomAvailabilitySection(props: RoomAvailabilitySectionProps) {
    const [selectedRoomId, setSelectedRoomId] = useState<string>('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

    return (
        <View style={styles.background}>
            <View style={[
                styles.container,
                { marginBottom: selectedRoomId.length === 0 ? 600 : 0 }
            ]}>
                <RoomDropdown
                    setSelectedRoomId={setSelectedRoomId}
                    selectedRoomId={selectedRoomId}
                    {...props}
                />
            </View>
            {selectedRoomId !== '' && (
                <TimeSlotPicker
                    {...props}
                    selectedRoomId={selectedRoomId}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    setSelectedRoom={setSelectedRoom}
                />
            )}
            {selectedRoom && (
                <CompleteReservationPopUp
                    {...props}
                    setSelectedRoom={setSelectedRoom}
                    room={selectedRoom}
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
    container: {
        alignItems: 'center',
        width: '100%',
    },
})

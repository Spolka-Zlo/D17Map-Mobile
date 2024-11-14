import { Dispatch, SetStateAction, useState } from 'react'
import { View } from 'react-native'
import {  ReservationWithClassRoomInfo } from '@/constants/types'
import ReservationInfoComponent from '@/components/reservation_components/ReservationInfoComponent'
import EditReservationComponent from '@/components/reservation_components/EditReservationComponent'
import { useClassrooms } from '@/services/classroomService'

type ReservationManagerProps = {
    reservation: ReservationWithClassRoomInfo
    setReservation: Dispatch<SetStateAction<ReservationWithClassRoomInfo | null>>
}

export default function ReservationManager(props: ReservationManagerProps) {
    const [editSectionVisible, setEditSectionVisible] = useState(false)
    const { rooms } = useClassrooms()

    return (
        <View>
            {editSectionVisible ? (
                <EditReservationComponent
                    {...props}
                    setEditSectionVisible={setEditSectionVisible}
                    classRooms={rooms}
                />
            ) : (
                <ReservationInfoComponent
                    {...props}
                    setEditSectionVisible={setEditSectionVisible}
                    classRooms={rooms}
                />
            )}
        </View>
    )
}

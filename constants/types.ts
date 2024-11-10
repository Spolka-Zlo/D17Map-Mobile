export type Room = {
    id: string
    name: string
    capacity: number
    equipmentIds: string[]
    modelKey: string
}

export type Reservation = {
    id: string
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    classroomId: string
    type: string
    numberOfParticipants: number
}

export type ReservationWithClassRoomInfo = {
    id: string
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    classroom: Room
    type: string
    numberOfParticipants: number
}

export type Equipment = {
    id: string
    name: string
}
export type Room = {
    id: string
    name: string
    capacity: number
    equipmentIds: string[]
}

export type Reservation = {
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    classroomId: string
    type: string
    numberOfParticipants: number
}

export type SimpleReservation = {
    id: number
    classroom: string
    title: string
    date: string
    startTime: string
    endTime: string
    type: string
}
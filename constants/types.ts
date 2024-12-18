export type Room = {
    id: string
    name: string
    capacity: number
    description: string
    equipmentIds: string[]
    modelKey: string
    floorName: string
}

export type ExtraRoom = {
    id: string
    name: string
    modelKey: string
    description: string
    type: string
    floorName: string
}

export type Floor = {
    id: string
    name: string
    building: string
}

export type Builidng = {
    id: string
    name: string
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

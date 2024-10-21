export type RoomEquipment = {
    id: string
    name: string
}

export type Room = {
    id: string
    name: string
    capacity: number
    equipments: RoomEquipment[]
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
    type: ReservationType
}

enum ReservationType {
    CLASS,
    EXAM,
    TEST,
    CONSULTATIONS,
    CONFERENE,
    STUDENTS_CLUB_MEETING,
}
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
    floorName: string
}

export type Builidng = {
    id: string
    name: string
}

export enum ReccuringType {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY"
}

export const recurringTypeMap: { [key: string]: string } = {
    DAILY: "Codziennie",
    WEEKLY: "Co tydzień",
    BIWEEKLY: "Co dwa tygodnie",
    MONTHLY: "Co miesiąc",
};

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
    recurringId?: string,
    recurringName?: string
    recurringEndDate?: string,
    recurringType?: ReccuringType,
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
    numberOfParticipants: number,
    recurringId?: string,
    recurringName?: string
    recurringEndDate?: string,
    recurringType?: ReccuringType
}

export type Equipment = {
    id: string
    name: string
}

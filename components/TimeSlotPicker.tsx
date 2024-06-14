import { DayReservation, Room } from '@/app/(tabs)/reservation/newReservation'
import Colors from '@/constants/Colors'
import React, { JSXElementConstructor, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { OrangeButton } from './OrangeButton'

interface TimeSlotPickerProps {
    reservations: DayReservation[]
    selectedRoomsId: string[]
    rooms: Room[]
    setStartTime: React.Dispatch<React.SetStateAction<string>>
    setEndTime: React.Dispatch<React.SetStateAction<string>>
    setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

export default function TimeSlotPicker({
    reservations,
    selectedRoomsId,
    rooms,
    setStartTime,
    setEndTime,
    setSelectedRoom,
}: TimeSlotPickerProps) {
    const [firstSelectedSlot, setFirstSelectedSlot] = useState<number | null>(
        null
    )
    const [secondSelectedSlot, setSecondSelectedSlot] = useState<number | null>(
        null
    )
    const [RoomAvailabilityBySlots, setRoomAvailabilityBySlots] = useState<{
        [key: number]: string[]
    }>({})
    const [roomColors, setRoomColors] = useState<{ [key: string]: string }>({})

    const getSlotId = (time: string): number => {
        const [hours, minutes] = time.split(':').map((x) => parseInt(x))
        return (hours - 7) * 4 + Math.floor(minutes / 15)
    }

    useEffect(() => {
        const roomColors: { [key: string]: string } = {}
        console.log(selectedRoomsId)
        for (let i = 0; i < rooms.length; i++) {
            roomColors[selectedRoomsId[i]] = Colors.roomColors[i]
        }
        setRoomColors(roomColors)
    }, [selectedRoomsId])

    useEffect(() => {
        const getRoomAvailabilityBySlots = (): { [key: number]: string[] } => {
            const roomAvailabilityBySlots: { [key: number]: string[] } = {}
            for (let slotId = 0; slotId < 60; slotId++) {
                roomAvailabilityBySlots[slotId] = selectedRoomsId
            }
            console.log(reservations)
            reservations.forEach((reservation) => {
                const startSlotId = getSlotId(reservation.startTime)
                const endSlotId = getSlotId(reservation.endTime) - 1
                for (let slotId = startSlotId; slotId <= endSlotId; slotId++) {
                    roomAvailabilityBySlots[slotId] = roomAvailabilityBySlots[
                        slotId
                    ].filter((roomId) => roomId !== reservation.classroom.id)
                }
            })

            return roomAvailabilityBySlots
        }
        setRoomAvailabilityBySlots(getRoomAvailabilityBySlots())
    }, [reservations, selectedRoomsId])

    const handlePress = (slotId: number) => {
        if (firstSelectedSlot !== null && slotId < firstSelectedSlot) {
            setFirstSelectedSlot(slotId)
            setSecondSelectedSlot(null)
            return
        }
        if (firstSelectedSlot === null) {
            setFirstSelectedSlot(slotId)
        } else if (secondSelectedSlot === null) {
            setSecondSelectedSlot(slotId)
        } else {
            setFirstSelectedSlot(slotId)
            setSecondSelectedSlot(null)
        }
    }

    const canSelectBlock = (slotId: number): boolean => {
        if (firstSelectedSlot === null) {
            return true
        }
        if (firstSelectedSlot !== null && secondSelectedSlot !== null) {
            return true
        }
        let roomsAvailable = Array.from(
            { length: selectedRoomsId.length },
            () => true
        )
        for (let i = firstSelectedSlot; i <= slotId; i++) {
            selectedRoomsId.forEach((roomId, index) => {
                if (!RoomAvailabilityBySlots[i].includes(roomId)) {
                    roomsAvailable[index] = false
                }
            })
            if (roomsAvailable.every((x) => !x)) {
                return false
            }
        }
        return true
    }

    const isBlockSelected = (slotId: number): boolean => {
        if (firstSelectedSlot !== null && secondSelectedSlot !== null) {
            const min = Math.min(firstSelectedSlot, secondSelectedSlot)
            const max = Math.max(firstSelectedSlot, secondSelectedSlot)
            return slotId >= min && slotId <= max
        }
        return slotId === firstSelectedSlot
    }

    const darkenColor = (color: string, factor: number): string => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)

        const newR = Math.floor(r * factor)
        const newG = Math.floor(g * factor)
        const newB = Math.floor(b * factor)

        const toHex = (value: number): string => {
            const hex = value.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }

        return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
    }

    const handleConfirm = () => {
        if (firstSelectedSlot !== null && secondSelectedSlot !== null) {
            setStartTime(
                `${Math.floor(firstSelectedSlot / 4) + 7}:${String(
                    (firstSelectedSlot % 4) * 15
                ).padStart(2, '0')}`
            )
            setEndTime(
                `${Math.floor((secondSelectedSlot + 1) / 4) + 7}:${String(
                    ((secondSelectedSlot + 1) % 4) * 15
                ).padStart(2, '0')}`
            )
            setSelectedRoom(
                rooms.find((room) => {
                    for (
                        let i = firstSelectedSlot;
                        i <= secondSelectedSlot;
                        i++
                    ) {
                        if (!RoomAvailabilityBySlots[i].includes(room.id)) {
                            return false
                        }
                    }
                    return true
                }) ?? null
            )
            console.log(
                rooms.find(
                    (room) =>
                        RoomAvailabilityBySlots[firstSelectedSlot].includes(
                            room.id
                        ) &&
                        RoomAvailabilityBySlots[secondSelectedSlot].includes(
                            room.id
                        )
                )
            )
        }
    }

    function renderRows(): JSX.Element[] {
        const rows = []
        for (let i = 0; i < 15; i++) {
            rows.push(
                <View key={`row-${i}`} style={styles.row}>
                    <Text style={styles.label}>{i + 7}</Text>
                    <View style={styles.rowContainer}>
                        {Array.from({ length: 4 }, (_, j) => {
                            const slotId = i * 4 + j
                            let colors: string[] = []
                            let disabled = false
                            if (RoomAvailabilityBySlots[slotId] !== undefined) {
                                RoomAvailabilityBySlots[slotId].map(
                                    (roomId) => {
                                        colors.push(roomColors[roomId])
                                    }
                                )
                                if (
                                    RoomAvailabilityBySlots[slotId].length === 0
                                ) {
                                    disabled = true
                                }
                            }
                            return (
                                <TouchableOpacity
                                    key={slotId}
                                    style={[
                                        styles.block,
                                        j === 3 && { borderBottomWidth: 3 },
                                        disabled && styles.blockUnavailable,
                                    ]}
                                    disabled={
                                        disabled || !canSelectBlock(slotId)
                                    }
                                    onPress={() => handlePress(slotId)}
                                >
                                    <View style={styles.colorContainer}>
                                        {colors.map((color, index) => (
                                            <View
                                                key={index}
                                                style={[
                                                    {
                                                        backgroundColor: color,
                                                        height: '100%',
                                                        width: `${100 / colors.length}%`,
                                                    },
                                                    isBlockSelected(slotId) && [
                                                        {
                                                            backgroundColor:
                                                                darkenColor(
                                                                    color,
                                                                    0.25
                                                                ),
                                                        },
                                                    ],
                                                ]}
                                            />
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            )
        }
        rows.push(
            <View key={60} style={styles.row}>
                <Text style={styles.label}>22</Text>
            </View>
        )
        return rows
    }

    return (
        <View>
            <View style={styles.container}>
                {renderRows()}
                {firstSelectedSlot !== null && secondSelectedSlot !== null && (
                    <OrangeButton
                        text="Potwierdź"
                        onPress={handleConfirm}
                        buttonStyle={styles.botton}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 30,
        paddingBottom: 8,
        paddingRight: 30,
        borderRadius: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    rowContainer: {
        flexDirection: 'column',
        marginRight: 10,
    },
    block: {
        width: 200,
        height: 24,
        borderColor: 'black',
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    colorContainer: {
        flexDirection: 'row',
        height: '98%',
    },
    blockUnavailable: {
        backgroundColor: '#d60202',
        borderTopWidth: 0,
    },
    label: {
        textAlign: 'right',
        paddingRight: 6,
        width: 40,
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
        top: -13,
    },
    botton: {
        marginLeft: 29,
    },
})

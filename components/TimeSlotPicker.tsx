import { DayReservation } from '@/app/(tabs)/reservation/newReservation'
import Colors from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { OrangeButton } from './OrangeButton'
import { Room } from '@/constants/types'

interface TimeSlotPickerProps {
    reservations: DayReservation[]
    selectedRoomId: string
    rooms: Room[]
    setStartTime: React.Dispatch<React.SetStateAction<string>>
    setEndTime: React.Dispatch<React.SetStateAction<string>>
    setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>
}

export default function TimeSlotPicker({
    reservations,
    selectedRoomId,
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
    const [roomAvailabilityBySlots, setRoomAvailabilityBySlots] = useState<{
        [key: number]: boolean
    }>({})

    const getSlotId = (time: string): number => {
        const [hours, minutes] = time.split(':').map((x) => parseInt(x))
        return (hours - 7) * 4 + Math.floor(minutes / 15)
    }

    useEffect(() => {
        const getRoomAvailabilityBySlots = (): { [key: number]: boolean } => {
            const availability: { [key: number]: boolean } = {}
            for (let slotId = 0; slotId < 60; slotId++) {
                availability[slotId] = true
            }
            reservations?.forEach((reservation) => {
                if (reservation.classroom.id === selectedRoomId) {
                    const startSlotId = getSlotId(reservation.startTime)
                    const endSlotId = getSlotId(reservation.endTime) - 1
                    for (let slotId = startSlotId; slotId <= endSlotId; slotId++) {
                        availability[slotId] = false
                    }
                }
            })
            return availability
        }
        setRoomAvailabilityBySlots(getRoomAvailabilityBySlots())
    }, [reservations, selectedRoomId])

    useEffect(() => {
        setFirstSelectedSlot(null)
        setSecondSelectedSlot(null)
    }, [rooms])

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
        for (let i = firstSelectedSlot; i <= slotId; i++) {
            if (!roomAvailabilityBySlots[i]) {
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
            const room = rooms.find((room) => room.id === selectedRoomId) ?? null
            setSelectedRoom(room)
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
                            const isUnavailable = !roomAvailabilityBySlots[slotId]
    
                            return (
                                <TouchableOpacity
                                    key={slotId}
                                    style={[
                                        styles.block,
                                        j === 3 && { borderBottomWidth: 3 },
                                    ]}
                                    disabled={
                                        isUnavailable || !canSelectBlock(slotId)
                                    }
                                    onPress={() => handlePress(slotId)}
                                >
                                    <View
                                        style={[
                                            styles.colorContainer,
                                            isUnavailable && styles.blockUnavailable,
                                            isBlockSelected(slotId) && {
                                                backgroundColor: darkenColor(
                                                    '#F6A200',
                                                    0.25
                                                ),
                                            },
                                        ]}
                                    />
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
        backgroundColor: '#F6A200',
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

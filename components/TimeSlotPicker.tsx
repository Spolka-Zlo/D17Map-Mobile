import { DayReservation } from '@/app/(tabs)/reservation/newReservation'
import Colors from '@/constants/Colors'
import React, { JSXElementConstructor, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

interface TimeSlotPickerProps {
    reservations: DayReservation[]
    selectedRoomsId: number[]
}

export default function TimeSlotPicker({
    reservations,
    selectedRoomsId,
}: TimeSlotPickerProps) {
    const [firstSelectedBlock, setFirstSelectedBlock] = useState<number | null>(
        null
    )
    const [secondSelectedBlock, setSecondSelectedBlock] = useState<
        number | null
    >(null)
    const [roomColors, setRoomColors] = useState<{ [key: number]: string }>({})

    useEffect(() => {
        const generateRandomColor = (): string => {
            const letters = '0123456789ABCDEF'
            let color = '#'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            color += '80'
            return color
        }
        const newRoomColors: { [key: number]: string } = {}
        selectedRoomsId.forEach((roomId) => {
            newRoomColors[roomId] = generateRandomColor()
        })
        setRoomColors(newRoomColors)
    }, [selectedRoomsId])

    const handlePress = (blockId: number) => {
        if (firstSelectedBlock === null) {
            setFirstSelectedBlock(blockId)
        } else if (secondSelectedBlock === null) {
            setSecondSelectedBlock(blockId)
        } else {
            setFirstSelectedBlock(blockId)
            setSecondSelectedBlock(null)
        }
    }

    const isBlockAvailable = (blockId: number): boolean => {
        // return true
        if (blockId % 10 !== 0) {
            return true
        }
        return false
        //TODO: check if block is available
    }

    const isBlockSelected = (blockId: number): boolean => {
        if (firstSelectedBlock !== null && secondSelectedBlock !== null) {
            const min = Math.min(firstSelectedBlock, secondSelectedBlock)
            const max = Math.max(firstSelectedBlock, secondSelectedBlock)
            return blockId >= min && blockId <= max
        }
        return blockId === firstSelectedBlock
    }

    function renderRows(): JSX.Element[] {
        const rows = []
        for (let i = 0; i < 15; i++) {
            rows.push(
                <View key={`row-${i}`} style={styles.row}>
                    <Text style={styles.label}>{i + 7}</Text>
                    <View style={styles.rowContainer}>
                        {Array.from({ length: 4 }, (_, j) => {
                            const blockId = i * 4 + j
                            return (
                                <TouchableOpacity
                                    key={blockId}
                                    style={[
                                        styles.block,
                                        isBlockSelected(blockId) &&
                                            styles.selectedBlock,
                                        j === 3 && { borderBottomWidth: 3 },
                                        !isBlockAvailable(blockId) &&
                                            styles.blockUnavailable,
                                    ]}
                                    disabled={!isBlockAvailable(blockId)}
                                    onPress={() => handlePress(blockId)}
                                />
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

    return <View style={styles.container}>{renderRows()}</View>
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
    selectedBlock: {
        backgroundColor: Colors.primary,
    },
    blockUnavailable: {
        backgroundColor: Colors.secondary,
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
})

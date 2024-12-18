import { OrangeButton } from '@/components/OrangeButton'
import { Spinner } from '@/components/Spinner'
import Colors from '@/constants/Colors'
import { ExtraRoom, Room } from '@/constants/types'
import {
    useClassrooms,
    useExtraRooms,
    useFloors,
} from '@/services/classroomService'
import { Href, router } from 'expo-router'
import React from 'react'
import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

export default function Map() {
    const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(null)

    const { rooms, isRoomsError, isRoomsLoading } = useClassrooms()
    const { extraRooms } = useExtraRooms()
    const { floors, isFloorsLoading } = useFloors()

    const roomData = rooms
        ? rooms
              .concat(extraRooms)
              .sort((a: Room | ExtraRoom, b: Room | ExtraRoom) =>
                  a.name.localeCompare(b.name)
              )
        : []

    if (isRoomsError ) {
        router.push('/(tabs)/map/1')
        return <View></View>
    }

    const roomFloor: string =
        roomData && floors
            ? roomData?.find(
                  (room: Room | ExtraRoom) => room?.modelKey === selectedRoomKey
              )?.floorName || '1'
            : '1'

    return (
        <View style={styles.container}>
            <Spinner isLoading={isRoomsLoading || isFloorsLoading} />
            <View style={styles.buttonContainer}>
                <OrangeButton
                    text="Przejdź do interaktywnej mapy budynku"
                    onPress={() => {
                        router.push('/(tabs)/map/1')
                    }}
                />
            </View>

            {rooms && rooms.length > 0 && (
                <>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            data={roomData}
                            value={selectedRoomKey}
                            labelField={'name'}
                            valueField={'modelKey'}
                            placeholder="Wybierz salę"
                            onChange={(room: Room | ExtraRoom) =>
                                setSelectedRoomKey(room.modelKey)
                            }
                            maxHeight={300}
                            style={styles.dropdown}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <OrangeButton
                            text="Pokaż salę na mapie"
                            onPress={() => {
                                {
                                    const url: Href = `/(tabs)/map/${roomFloor}?key=${selectedRoomKey}`
                                    router.push(url)
                                }
                            }}
                            disabled={!selectedRoomKey}
                        />
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mapGrey,
    },
    buttonContainer: {
        marginHorizontal: '5%',
        marginVertical: 20,
    },
    dropdownContainer: {
        marginHorizontal: '5%',
        width: '90%',
        zIndex: 2,
        marginVertical: 10,
    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
    },
})

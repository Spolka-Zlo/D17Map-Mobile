import Colors from '@/constants/Colors'
import { Room } from '@/constants/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type RoomDropdownProps = {
    setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>
    selectedRoomId: string
    rooms: Room[]
}

const RoomDropdown = (props: RoomDropdownProps) => {
    const roomsData = props.rooms.map((room) => ({
        value: room.id,
        label: room.name,
    }))

    return (
        <View style={styles.dropdownContainer}>
            <Dropdown
                data={roomsData}
                value={props.selectedRoomId}
                labelField={'label'}
                valueField={'value'}
                onChange={(value: {
                    label: string
                    value: string
                }) => {props.setSelectedRoomId(value.value)
                }}
                placeholder='Wybierz interesującą Cię salę'
                maxHeight={400}
                style={styles.dropdown}
            />
        </View>
    )
}

export default RoomDropdown

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '90%',
        zIndex: 2,
        marginVertical: 10,
    },
    dropdown: {
        width: '100%',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.mapGrey,
        borderRadius: 8,
        padding: 10,
    },
})

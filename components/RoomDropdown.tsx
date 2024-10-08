import { Room } from '@/app/(tabs)/reservation/newReservation'
import Colors from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
// import AntDesign from '@expo/vector-icons/AntDesign'  // this import makes mistake fontFamily "anticon" is not a system font and has not been loaded through expo-font.

type RoomDropdownProps = {
    setSelectedRooms: React.Dispatch<React.SetStateAction<string[]>>,
    selectedRooms: string[],
    rooms: Room[],
}

type RoomDropdown = {
    value: string
    label: string
}

const RoomDropdown = ({ setSelectedRooms, selectedRooms, rooms }: RoomDropdownProps) => {
    const [selected, setSelected] = useState([''])
    const [searchText, setSearchText] = useState('')

    const [roomsList, setRoomsList] = useState<RoomDropdown[]>([])

    useEffect(() => {
        setRoomsList(
            rooms.map((room) => ({ value: room.id, label: room.name }))
        )
    }, [rooms])

    const filteredRooms = roomsList.filter((room) =>
        room.label.toLowerCase().includes(searchText.toLowerCase())
    )

    const renderItem = (item: {
        label:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined
    }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={filteredRooms}
                containerStyle={styles.containerStyle}
                labelField="label"
                valueField="value"
                placeholder="Wybierz salę"
                value={selected}
                search
                searchPlaceholder="Wyszukaj..."
                onChange={(value) => {
                    if (value.length <= 4) {
                        setSelected(value)
                        setSelectedRooms(value.filter((room) => room !== ''))
                    } else {
                        Alert.alert('Osiągnięto limit', 'Możesz wybrać na raz tylko 3 pokoje')
                    }
                }}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                    >
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>
                                {item.label}
                            </Text>
                            {/* <AntDesign color="black" name="delete" size={17} /> */}
                        </View>
                    </TouchableOpacity>
                )}
                renderInputSearch={() => (
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderColor: '#DDDDDD',
                        paddingHorizontal: 8,
                        marginBottom: 5,
                        margin: 6,
                        height: 45,
                        borderRadius: 5,
                        color: Colors.secondary,
                      }}
                      value={searchText}
                      onChangeText={e => {
                        setSearchText(e);
                      }}
                      placeholder="Search..."
                      placeholderTextColor={Colors.secondary}
                    />
                  )}
            />
        </View>
    )
}

export default RoomDropdown

const styles = StyleSheet.create({
    container: { padding: 16, width: '95%' },
    containerStyle: {
        backgroundColor: Colors.primary,
    },
    dropdown: {
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.secondary,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: Colors.secondary,
        fontWeight: 'bold',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: Colors.secondary,
        borderColor: Colors.secondary,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: Colors.secondary,
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textSelectedStyle: {
        // marginRight: 5,
        fontSize: 18,
        color: Colors.primary,
        fontWeight: 'bold',
    },
})

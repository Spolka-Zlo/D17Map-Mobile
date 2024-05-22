import Colors from '@/constants/Colors'
import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
// import AntDesign from '@expo/vector-icons/AntDesign'  // this import makes mistake fontFamily "anticon" is not a system font and has not been loaded through expo-font.

const data = [
    { label: 'Sala 1'},
    { label: 'Sala 2'},
    { label: 'Sala 3'},
    { label: 'Sala 4'},
    { label: 'Sala 5'},
    { label: 'Sala 6'},
    { label: 'Sala 7'},
    { label: 'Sala 8'},
]

type RoomDropdownProps = {
    setSelectedRooms: React.Dispatch<React.SetStateAction<string[]>>
}

const RoomDropdown = ({ setSelectedRooms }: RoomDropdownProps) => {
    const [selected, setSelected] = useState([])

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
                {/* <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                /> */}
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
                data={data}
                containerStyle={styles.containerStyle}
                labelField="label"
                valueField="label"
                placeholder="Wybierz salę"
                value={selected}
                search
                searchPlaceholder="Wyszukaj..."
                onChange={(item: string[]) => {
                    setSelected(item)
                    setSelectedRooms(item)
                }}
                selectedStyle={{ backgroundColor: 'red' }}
                // renderLeftIcon={() => (
                //     // <AntDesign
                //     //     style={styles.icon}
                //     //     color="black"
                //     //     name="Safety"
                //     //     size={20}
                //     // />
                // )}
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
        marginRight: 5,
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
    },
})

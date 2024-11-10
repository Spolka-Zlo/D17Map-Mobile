import Colors from '@/constants/Colors'
import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type DropdownProps = {
    options: string[]
    selected: string
    setSelected: Dispatch<SetStateAction<string>>
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Dropdown({
    options,
    selected,
    setSelected,
    isOpen,
    setIsOpen,
}: DropdownProps) {
    return (
        <View
            style={styles.dropdownContainer}
            onTouchStart={(e) => e.stopPropagation()}
        >
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={styles.dropdownButton}
            >
                <Text style={styles.optionText}>{selected}</Text>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                setSelected(option)
                                setIsOpen(false)
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
    },
    dropdownButton: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        borderWidth: 1,
    },
    dropdownList: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        borderWidth: 1,
        zIndex: 3,
    },
    dropdownItem: {
        padding: 12,
        backgroundColor: Colors.primary,
        borderRadius: 8,
    },
    optionText: {
        color: Colors.secondary,
        fontWeight: '800',
    },
})

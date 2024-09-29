import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '@/constants/Colors'
import { Picker } from '@react-native-picker/picker'
import { Styles } from '@/constants/Styles'

type TimePickerProps = {
    setStartTime: Dispatch<SetStateAction<string>>
    setEndTime: (time: string) => void
}

export default function TimePicker({
    setStartTime,
    setEndTime,
}: TimePickerProps) {
    const [selectedStartHour, setSelectedStartHour] = useState('7')
    const [selectedStartMinute, setSelectedStartMinute] = useState('00')
    const [selectedEndHour, setSelectedEndHour] = useState('7')
    const [selectedEndMinute, setSelectedEndMinute] = useState('15')

    useEffect(() => {
        const loadData = async () => {
            try {
                const startHour =
                    await AsyncStorage.getItem('selectedStartHour')
                const startMinute = await AsyncStorage.getItem(
                    'selectedStartMinute'
                )
                const endHour = await AsyncStorage.getItem('selectedEndHour')
                const endMinute =
                    await AsyncStorage.getItem('selectedEndMinute')

                if (startHour !== null) setSelectedStartHour(startHour)
                if (startMinute !== null) setSelectedStartMinute(startMinute)
                if (endHour !== null) setSelectedEndHour(endHour)
                if (endMinute !== null) setSelectedEndMinute(endMinute)

                setStartTime(`${startHour || '7'}:${startMinute || '00'}`)
                setEndTime(`${endHour || '7'}:${endMinute || '15'}`)
            } catch (error) {
                console.error('Failed to load time data', error)
            }
        }

        loadData()
    }, [setStartTime, setEndTime])

    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem(
                    'selectedStartHour',
                    selectedStartHour
                )
                await AsyncStorage.setItem(
                    'selectedStartMinute',
                    selectedStartMinute
                )
                await AsyncStorage.setItem('selectedEndHour', selectedEndHour)
                await AsyncStorage.setItem(
                    'selectedEndMinute',
                    selectedEndMinute
                )
            } catch (error) {
                console.error('Failed to save time data', error)
            }
        }

        saveData()
    }, [
        selectedStartHour,
        selectedStartMinute,
        selectedEndHour,
        selectedEndMinute,
    ])

    const startHours = Array.from({ length: 15 }, (_, i) => (i + 7).toString())
    const minutes = ['00', '15', '30', '45']

    const endHours = []
    for (let i = parseInt(selectedStartHour); i <= 21; i++) {
        if (
            parseInt(selectedStartMinute) !== 45 ||
            i !== parseInt(selectedStartHour)
        ) {
            endHours.push(i.toString())
        }
    }
    if (parseInt(selectedStartHour) < 22) {
        endHours.push('22')
    }

    const endMinutes = []
    if (selectedEndHour === selectedStartHour) {
        minutes.forEach((minute) => {
            if (parseInt(minute) > parseInt(selectedStartMinute)) {
                endMinutes.push(minute)
            }
        })
        if (selectedStartMinute === '45') {
            setSelectedEndHour((parseInt(selectedEndHour) + 1).toString())
            setSelectedEndMinute('00')
        }
    } else if (selectedEndHour === '22') {
        endMinutes.push('00')
    } else {
        endMinutes.push(...minutes)
    }

    const handleStartHourChange = (itemValue: string) => {
        setSelectedStartHour(itemValue)
        setStartTime(`${itemValue}:${selectedStartMinute}`)

        if (
            parseInt(itemValue) > parseInt(selectedEndHour) ||
            (itemValue === selectedEndHour &&
                parseInt(selectedStartMinute) >= parseInt(selectedEndMinute))
        ) {
            setSelectedEndHour(itemValue)
            setSelectedEndMinute('15')
            setEndTime(`${itemValue}:15`)
        }
    }

    const handleStartMinuteChange = (itemValue: string) => {
        setSelectedStartMinute(itemValue)
        setStartTime(`${selectedStartHour}:${itemValue}`)

        if (
            selectedStartHour === selectedEndHour &&
            parseInt(itemValue) >= parseInt(selectedEndMinute)
        ) {
            setSelectedEndMinute('15')
            setEndTime(`${selectedStartHour}:15`)
        }
    }

    const handleEndHourChange = (itemValue: string) => {
        setSelectedEndHour(itemValue)
        if (itemValue === '22') {
            setSelectedEndMinute('00')
            setEndTime(`${itemValue}:00`)
        } else if (
            itemValue === selectedStartHour &&
            parseInt(selectedStartMinute) >= parseInt(selectedEndMinute)
        ) {
            setSelectedEndMinute('15')
            setEndTime(`${itemValue}:15`)
        } else {
            setEndTime(`${itemValue}:${selectedEndMinute}`)
        }
    }

    const handleEndMinuteChange = (itemValue: string) => {
        setSelectedEndMinute(itemValue)
        setEndTime(`${selectedEndHour}:${itemValue}`)
    }

    return (
        <View style={styles.container}>
            <Text style={Styles.h2}>Wybierz godziny:</Text>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Od:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedStartHour}
                        style={styles.picker}
                        onValueChange={handleStartHourChange}
                        itemStyle={styles.pickerItem}
                    >
                        {startHours.map((hour) => (
                            <Picker.Item
                                key={hour}
                                label={hour}
                                value={hour}
                                style={styles.pickerItem}
                            />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedStartMinute}
                        style={styles.picker}
                        onValueChange={handleStartMinuteChange}
                        itemStyle={styles.pickerItem}
                    >
                        {minutes.map((minute) => (
                            <Picker.Item
                                key={minute}
                                label={minute}
                                value={minute}
                                style={styles.pickerItem}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Do:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedEndHour}
                        style={styles.picker}
                        onValueChange={handleEndHourChange}
                        itemStyle={styles.pickerItem}
                    >
                        {endHours.map((hour) => (
                            <Picker.Item
                                key={hour}
                                label={hour}
                                value={hour}
                                style={styles.pickerItem}
                            />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedEndMinute}
                        enabled={selectedEndHour !== '22'}
                        style={styles.picker}
                        onValueChange={handleEndMinuteChange}
                        itemStyle={styles.pickerItem}
                    >
                        {endMinutes.map((minute) => (
                            <Picker.Item
                                key={minute}
                                label={minute}
                                value={minute}
                                style={styles.pickerItem}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
        flex: 1,
    },
    label: {
        fontSize: 18,
        paddingTop: 6,
        marginBottom: 8,
        marginRight: 8,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    pickerWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.secondary,
    },
    picker: {
        height: 30,
        width: 100,
        backgroundColor: Colors.secondary,
    },
    pickerItem: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    colon: {
        fontSize: 18,
        marginHorizontal: 8,
        color: Colors.primary,
        fontWeight: 'bold',
    },
})

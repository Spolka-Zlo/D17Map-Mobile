import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'
import RNDateTimePicker from '@react-native-community/datetimepicker'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        padding: 16,
        marginTop: -10,
    },
    picker: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 10,
        width: '100%',
        borderRadius: 10,
    },
    text: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    headText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
})

type TimePickerProps = {
    startTime: string
    endTime: string
    setStartTime: (time: string) => void
    setEndTime: (time: string) => void
}

export default function TimePicker({
    startTime,
    endTime,
    setStartTime,
    setEndTime,
}: TimePickerProps) {
    const [startPickShow, setStartShow] = useState(false)
    const [endPickShow, setEndShow] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Wprowadź godziny rezerwacji</Text>
            <TouchableOpacity
                style={styles.picker}
                onPress={() => setStartShow(true)}
            >
                <Text style={styles.text}>
                    {startTime || 'Wskaż godzinę rozpoczęcia'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.picker}
                onPress={() => setEndShow(true)}
            >
                <Text style={styles.text}>
                    {endTime || 'Wskaż godzinę zakończenia'}
                </Text>
            </TouchableOpacity>
            {startPickShow && (
                <RNDateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    is24Hour={true}
                    onChange={(event, selectedDate) => {
                        setStartShow(false)
                        setStartTime(
                            selectedDate?.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }) || ''
                        )
                    }}
                />
            )}
            {endPickShow && (
                <RNDateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    is24Hour={true}
                    onChange={(event, selectedDate) => {
                        setEndShow(false)
                        setEndTime(
                            selectedDate?.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }) || ''
                        )
                    }}
                />
            )}
        </View>
    )
}

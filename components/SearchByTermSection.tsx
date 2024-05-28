import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Styles } from '@/constants/Styles'
import CheckBox from 'expo-checkbox'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import TimePicker from './TimePicker'
import { Reservation } from '@/app/(tabs)/reservation'

// przekazać tutaj wszsytkie rezerwacje i sale i na bieżąco filtrować

type SearchByTermSectionProps = {
    reservations: Reservation[]
}

export default function SearchByTermSection() {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [computers, setComputers] = useState(false)
    const [terminals, setTerminals] = useState(false)
    const [networking, setNetworking] = useState(false)
    const [minNuberOfSeats, setMinNumberOfSeats] = useState(0)

    const handleChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, ' ')
        if (numericValue === '') {
            setMinNumberOfSeats(0)
            return
        }
        setMinNumberOfSeats(parseInt(numericValue))
    }


    return (
        <View style={styles.containter}>
            <TimePicker setStartTime={setStartTime} setEndTime={setEndTime} />
            <View style={styles.checkboxSection}>
                <View style={styles.singleCheckBox}>
                    <CheckBox
                        style={styles.checkbox}
                        value={computers}
                        onValueChange={setComputers}
                        color={computers ? Colors.secondary : undefined}
                    />
                    <Text style={styles.label}>Komputery</Text>
                </View>
                <View style={styles.singleCheckBox}>
                    <CheckBox
                        style={styles.checkbox}
                        value={terminals}
                        onValueChange={setTerminals}
                        color={terminals ? Colors.secondary : undefined}
                    />
                    <Text style={styles.label}>Pracownia sieciowa</Text>
                </View>
                <View style={styles.singleCheckBox}>
                    <CheckBox
                        style={styles.checkbox}
                        value={networking}
                        onValueChange={setNetworking}
                        color={networking ? Colors.secondary : undefined}
                    />
                    <Text style={styles.label}>Terminale</Text>
                </View>
            </View>
            <View style={styles.containter}>
                <Text style={Styles.h2}>Minimalna liczba miejsc:</Text>
                <TextInput
                    style={styles.input}
                    value={minNuberOfSeats.toString()}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
            <Text style={Styles.h2}>Wybrane zasoby:</Text>
            <Text style={Styles.h2}>Od: {startTime}</Text>
            <Text style={Styles.h2}>Do: {endTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSection: {
        flexDirection: 'column',
        marginRight: 30,
    },
    singleCheckBox: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
        width: 35,
        height: 35,
        borderColor: Colors.primary,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 8,
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 4,
        color: Colors.primary,
        backgroundColor: Colors.secondary,

    },
})

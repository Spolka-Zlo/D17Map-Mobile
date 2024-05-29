import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import CheckBox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '@/constants/Colors'
import TimePicker from './TimePicker'
import { Reservation, Room } from '@/app/(tabs)/reservation/newReservation'
import Animated from 'react-native-reanimated'
import Dropdown from './Dropdown'

type CompleteReservationPopUpProps = {
    setSelectedRoom: (room: Room | null) => void
    setScrollAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

async function fetchReservationTypes() {
    // const response = await fetch('http://localhost:3000/reservationTypes')
    // const data = await response.json()
    let data = ['Kolokwium', 'Konsultacje', 'Spotkanie', 'Inne']
    return data
}

export default function CompleteReservationPopUp({
    setSelectedRoom,
    setScrollAvailable,
}: CompleteReservationPopUpProps) {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [selectedReservationType, setSelectedReservationType] = useState('')
    const [name, setName] = useState('')
    const [reservationTypes, setReservationTypes] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setReservationTypes(await fetchReservationTypes())
        }
        fetchData()
    }, [])

    return (
        <TouchableOpacity
            onPress={() => {
                setSelectedRoom(null)
                setScrollAvailable(true)
            }}
            style={styles.container}
        >
            <View style={styles.flex} onTouchStart={(e) => e.stopPropagation()}>
                <View style={styles.box}>
                    <TextInput placeholder="Nazwa rezerwacji" onChangeText={setName} value={name}/>
                    <Dropdown
                        options={reservationTypes}
                        selected={selectedReservationType}
                        setSelected={setSelectedReservationType}
                        isOpen={isDropDownOpen}
                        setIsOpen={setIsDropDownOpen}
                    />
                    <Text>zxcv</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary + '80',
        zIndex: 1,
    },
    flex: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

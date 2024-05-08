import { StyleSheet, View, Text } from 'react-native'
import { OrangeButton } from '@/components/OrangeButton'
import ListElement from '@/components/ListElement'
import Dropdown from '@/components/Dropdown'
import { useState } from 'react'
import Colors from '@/constants/Colors'

export default function TabOneScreen() {
    const [selected, setSelected] = useState('Option 1')
    const [isOpen, setIsOpen] = useState(false)
    return (
        <View
            style={styles.container}
            onTouchStart={() => {
                setIsOpen(false)
            }}
        >
            <ListElement text="Event number one" onPress={() => {}} />
            <OrangeButton text="Click Me" onPress={() => {}} />
            <Dropdown
                options={['Option 1', 'Option 2', 'Option 3']}
                selected={selected}
                setSelected={setSelected}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mapGrey,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { OrangeButton } from '@/components/OrangeButton'
import ListElement from '@/components/ListElement'
import Dropdown from '@/components/Dropdown'
import { useState } from 'react'
import Colors from '@/constants/Colors'

export default function TabOneScreen() {
    const [selected, setSelected] = useState("Option 1");
    return (
        <View style={styles.container}>
            <ListElement text="Event number one" onPress={() => {}} />
            <OrangeButton text="Click Me" onPress={() => {}} />
            <Dropdown
                options={["Option 1", "Option 2", "Option 3"]}
                selected={selected}
                setSelected={setSelected}
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

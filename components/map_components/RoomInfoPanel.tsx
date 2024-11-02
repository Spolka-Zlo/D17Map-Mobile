import Colors from '@/constants/Colors'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Room } from '@/constants/types'
import { useState } from 'react'
import { RoomInfoModal } from './RoomInfoModal'

type RoomInfoPanelProps = {
    room: Room | null
}

export const RoomInfoPanel = (props: RoomInfoPanelProps) => {
    const [isModalVisible, setModalVisible] = useState(false)

    if (!isModalVisible) {
        return (
            <View style={styles.container}>
                {!props.room ? (
                    <Text>
                        Dwukrotnie kliknij na pokój, żeby zobaczyć informacje
                    </Text>
                ) : (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>
                            Sala {props.room.name}, kliknij po więcej szczegółów
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    } else if (props.room) {
        return (
            <RoomInfoModal
                onClose={() => setModalVisible(false)}
                room={props.room}
            />
        )
    } else return null
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding: 10,
        maxWidth: '80%',
    },
})

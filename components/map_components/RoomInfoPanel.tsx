import Colors from '@/constants/Colors'
import { View, Text, StyleSheet } from 'react-native'

type RoomInfoPanelProps = {
    RoomKey: string | null
}

export const RoomInfoPanel = (props: RoomInfoPanelProps) => {
    return (
        <View style={styles.container}>
            {!props.RoomKey ? (
                <Text>Dwukrotnie kliknij na pokój, żeby zobaczyć informacje</Text>
            ) : (
                <Text>Room Info Panel {props.RoomKey} key</Text>
            )}
        </View>
    )
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

import { Styles } from '@/constants/Styles'
import { StyleSheet, View, Text } from 'react-native'

export default function Map() {
    console.log('MapScreen')
    return (
        <View style={Styles.background}>
            <Text style={Styles.h1}>Map</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

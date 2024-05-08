import { StyleSheet } from 'react-native'
import Colors from './Colors'

export const Styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.mapGrey,
        
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
})
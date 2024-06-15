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
        fontSize: 32,
        fontWeight: 'bold',
        paddingVertical: 10,
        color: Colors.primary,
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 16,
        color: Colors.primary,
    },
})
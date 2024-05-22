import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import { Styles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Calendar from './components/Calendar';

export default function Reservations() {
    return (
        <SafeAreaView style={Styles.background}>
            <Text style={Styles.h1}>Nowa rezerwacja</Text>
            
            <Calendar/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        marginBottom: 16,
    },
    textInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginBottom: 16,
    }
})

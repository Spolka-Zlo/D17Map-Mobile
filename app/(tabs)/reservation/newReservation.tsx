import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import { Styles } from '@/constants/Styles'
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Reservations() {
    return (
        <SafeAreaView style={Styles.background}>
            <Text style={Styles.h1}>New Reservation</Text>
            <Text style={Styles.h2}>Room</Text>
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

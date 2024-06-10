import React from 'react'
import { StyleSheet, View } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import Colors from '@/constants/Colors'

const styles = StyleSheet.create({
    customContainer: {
        alignItems: 'center',
        backgroundColor: Colors.primary + '80',
    },
    containerStyle: {
        margin: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    calendarStyle: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const customDatesStyles = [
    {
        date: new Date(),
        style: {
            borderColor: Colors.secondary,
            borderWidth: 2,
            backgroundColor: Colors.white,
        },
        textStyle: { color: 'black' },
    },
    // ready for events day custom styles
    // {
    //     date: new Date(2024, 4, 30),
    //     textStyle: { color: 'black' },
    //     containerStyle: [styles.customContainer],
    // },
    // {
    //     date: new Date(2024, 4, 31),
    //     style: { backgroundColor: 'blue' },
    //     textStyle: { color: 'black' },
    // },
]

type CalendarProps = {
    onDateChange: (date: Date) => void
}

export default function Calendar({ onDateChange }: CalendarProps) {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.calendarStyle}>
                <CalendarPicker
                    onDateChange={(date: Date) => {
                        onDateChange(date)
                    }}
                    weekdays={['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie']}
                    months={[
                        'Styczeń',
                        'Luty',
                        'Marzec',
                        'Kwiecień',
                        'Maj',
                        'Czerwiec',
                        'Lipiec',
                        'Sierpień',
                        'Wrzesień',
                        'Październik',
                        'Listopad',
                        'Grudzień',
                    ]}
                    startFromMonday={true}
                    previousTitle="Poprzedni"
                    nextTitle="Następny"
                    minDate={new Date()}
                    disabledDatesTextStyle={{ color: 'gray' }}
                    selectedDayColor={Colors.secondary}
                    restrictMonthNavigation={true}
                    customDatesStyles={customDatesStyles}
                    width={380}
                />
            </View>
        </View>
    )
}

import { Dispatch, SetStateAction } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native'
import { Styles } from '@/constants/Styles'
import { formatTime } from '@/app/utils/timeUtils'
import { ReservationWithClassRoomInfo } from '@/constants/types'
import Colors from '@/constants/Colors'

type EventManagerProps = {
    reservation: ReservationWithClassRoomInfo
    setReservation: Dispatch<
        SetStateAction<ReservationWithClassRoomInfo | null>
    >
}

export default function EventManager(props: EventManagerProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={!!props.reservation}
            onRequestClose={() => props.setReservation(null)}
        >
            <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPress={() => props.setReservation(null)}
            >
                <TouchableWithoutFeedback>
                    <View
                        style={styles.box}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <Text style={Styles.h1}>
                            {props.reservation?.title}
                        </Text>
                        <Text style={Styles.h2}>
                            {props.reservation?.description}
                        </Text>
                        <Text style={styles.dateString}>
                            {props.reservation?.date}{' '}
                            {formatTime(props.reservation?.startTime)}-
                            {formatTime(props.reservation?.endTime)}
                        </Text>
                        <Text style={styles.classroomName}>
                            Sala: {props.reservation.classroom.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    flex: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.8 * Dimensions.get('window').width,
    },
    dateString: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    classroomName: {
        fontSize: 20,
        marginVertical: 10,
    },
})

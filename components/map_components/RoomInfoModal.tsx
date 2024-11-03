import Colors from '@/constants/Colors'
import { Equipment, Room } from '@/constants/types'
import { useEquipmentOptions } from '@/services/classroomService'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
// import SpherePhoto from '../spherephoto_components/SpherePhoto'

type RoomInfoModalProps = {
    onClose: () => void
    room: Room
}

export const RoomInfoModal = (props: RoomInfoModalProps) => {
    const { equipmentOptions } = useEquipmentOptions()

    const roomEquipment = equipmentOptions
        .filter((equipment: Equipment) => props.room.equipmentIds.includes(equipment.id))
        .map((equipment: Equipment) => equipment.name)
        .join(', ')

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {/* <View style={styles.placeholder}>
                        <SpherePhoto/>
                    </View> */}
                    <Image source={{ uri: 'http://192.168.33.12:8080/classrooms/1/photo.jpg' }} style={styles.image} />
                    <Text style={styles.title}>{props.room.name}</Text>
                    <Text>Pojemność sali: {props.room.capacity}</Text>
                    <Text>Wyposażenie: {roomEquipment || 'Brak wyposażenia'}</Text>
                    <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Zamknij</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    innerContainer: {
        width: '80%',
        backgroundColor: Colors.white,
        display: 'flex',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    placeholder: {
        height: 400,
        width: '100%',
        zIndex: 12,
    },
    image:{
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
})
import Colors from '@/constants/Colors'
import { ipaddress } from '@/constants/ip'
import { Equipment, Room } from '@/constants/types'
import { useEquipmentOptions } from '@/services/classroomService'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import SpherePhoto from '../spherephoto_components/SpherePhoto'
import { useBuilding } from '@/providers/BuildingProvider'

type RoomInfoModalProps = {
    onClose: () => void
    room: Room
}

export const RoomInfoModal = (props: RoomInfoModalProps) => {
    const { buildingName } = useBuilding()
    const { equipmentOptions } = useEquipmentOptions()
    const imageUrl = `${ipaddress}buildings/${buildingName}/classrooms/${props.room.id}/photo`

    const roomEquipment = equipmentOptions
        .filter((equipment: Equipment) =>
            props.room.equipmentIds.includes(equipment.id)
        )
        .map((equipment: Equipment) => equipment.name)
        .join(', ')

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.placeholder}/>
                <SpherePhoto imageUrl={imageUrl} />
                <Text style={styles.title}>{props.room.name}</Text>
                <Text style={styles.description}>{props.room.description}</Text>
                <Text>Pojemność sali: {props.room.capacity}</Text>
                <Text>Wyposażenie: {roomEquipment || 'Brak wyposażenia'}</Text>
                <TouchableOpacity
                    onPress={props.onClose}
                    style={styles.closeButton}
                >
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
        height: 410,
        width: '100%',
        zIndex: 1,
    },
    placeholderText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
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

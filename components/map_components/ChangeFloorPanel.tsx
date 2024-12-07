import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'

type ChangeFloorPanelProps = {
    floor: string
    availableFloors: string[]
}

export const ChangeFloorPanel = (props: ChangeFloorPanelProps) => {
    const router = useRouter()
    const currentFloorIndex = props.availableFloors.indexOf(props.floor)
    const isUpEnabled = currentFloorIndex < props.availableFloors.length - 1
    const isDownEnabled = currentFloorIndex > 0

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={isUpEnabled ? styles.button : styles.disabledButton}
                    disabled={!isUpEnabled}
                    onPress={() => {
                        if (isUpEnabled) {
                            router.push(
                                `/(tabs)/map/${
                                    props.availableFloors[currentFloorIndex + 1]
                                }`
                            )
                        }
                    }}
                >
                    <Image
                        source={require('@/assets/images/up-arrow.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.floorText}>{props.floor}</Text>
                <TouchableOpacity
                    style={
                        isDownEnabled ? styles.button : styles.disabledButton
                    }
                    disabled={!isDownEnabled}
                    onPress={() => {
                        if (isDownEnabled) {
                            router.push(
                                `/(tabs)/map/${
                                    props.availableFloors[currentFloorIndex - 1]
                                }`
                            )
                        }
                    }}
                >
                    <Image
                        source={require('@/assets/images/down-arrow.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
        right: 10,
        zIndex: 2,
    },
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        alignItems: 'center',
        marginVertical: -10,
    },
    disabledButton: {
        padding: 10,
        opacity: 0.5,
        alignItems: 'center',
        marginVertical: -10,
    },
    floorText: {
        fontSize: 20,
    },
    image: {
        width: 40,
        height: 40,
    },
})

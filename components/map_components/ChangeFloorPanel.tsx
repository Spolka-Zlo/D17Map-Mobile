import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Upewnij się, że masz poprawny import

export const ChangeFloorPanel = (floor: number ) => {
    // Styl dla aktywnej i nieaktywnej strzałki
    const upArrowStyle = floor > 4 ? styles.arrow : styles.disabledArrow;
    const downArrowStyle = floor < 1 ? styles.disabledArrow : styles.arrow;

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Link
                    href={`/(tabs)/map/${floor + 1}`}
                    style={floor <= 4 ? styles.link : styles.disabledLink}
                    onPress={(e) => { 
                        if (floor > 4) {
                            e.preventDefault(); // Zablokuj nawigację, jeśli piętro jest większe niż 4
                        }
                    }}
                >
                    <Text style={upArrowStyle}>↑</Text>
                </Link>
                <Text style={styles.floorText}>{floor}</Text>
                <Link
                    href={`/(tabs)/map/${floor - 1}`}
                    style={floor >= 1 ? styles.link : styles.disabledLink}
                    onPress={(e) => {
                        if (floor < 1) {
                            e.preventDefault(); // Zablokuj nawigację, jeśli piętro jest mniejsze niż 1
                        }
                    }}
                >
                    <Text style={downArrowStyle}>↓</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 2,
    },
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    link: {
        padding: 10,
    },
    disabledLink: {
        padding: 10,
        opacity: 0.5, // Wyszarz link, jeśli nie jest aktywny
    },
    arrow: {
        fontSize: 24,
        color: 'black',
    },
    disabledArrow: {
        fontSize: 24,
        color: 'gray',
    },
    floorText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
});
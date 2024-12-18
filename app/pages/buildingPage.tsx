import Colors from '@/constants/Colors';
import { useBuilding } from '@/providers/BuildingProvider';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BuildingPage() {
    const { availableBuildings, isBuildingsLoading, isBuildingsError, setBuilding } = useBuilding();

    if (isBuildingsLoading) {
        return <Text>Loading buildings...</Text>;
    }

    if (isBuildingsError) {
        return <Text>Failed to load buildings.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Wybierz swój budynek:</Text>
            {availableBuildings.length === 0 ? (
                <Text>No buildings found.</Text>
            ) : (
                availableBuildings.map((building) => (
                    <TouchableOpacity
                        key={building.id}
                        style={styles.buildingItem}
                        onPress={() => {
                            setBuilding(building.id);
                            router.push('/(tabs)');
                        }}
                    >
                        <Text style={styles.buildingName}>{building.name}</Text>
                    </TouchableOpacity>

                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buildingItem: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        alignItems: 'center',
    },
    buildingName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white
    },
});
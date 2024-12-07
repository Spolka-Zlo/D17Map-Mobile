import { useBuilding } from '@/providers/BuildingProvider';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BuildingPage() {
    const { availableBuildings, isBuildingsLoading, isBuildingsError } = useBuilding();

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
                    <View key={building.id} style={styles.buildingItem}>
                        <Text style={styles.buildingName}>{building.name}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Building selected:', building);
                                router.push('/(tabs)');
                            }}
                        >
                            <Text>Wybierz</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    buildingName: {
        fontSize: 16,
    },
});

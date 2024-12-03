import { colorMapping } from '@/constants/Colors';
import { ExtraRoom } from '@/constants/types';
import { StyleSheet, Text, View } from 'react-native';

type LegendProps = {
    extraRooms: ExtraRoom[] | undefined;
};

export const Legend = (props: LegendProps) => {
    if (!props.extraRooms) {
        return null;
    }

    const roomTypesWithColors = Array.from(
        new Set(props.extraRooms.map((room) => room.type))
    ).map((type) => ({
        type,
        color: colorMapping[type],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.legendList}>
                {roomTypesWithColors.map(({ type, color }) => (
                    <View key={type} style={styles.legendItem}>
                        <View
                            style={[
                                styles.colorBox,
                                { backgroundColor: `#${color.toString(16).padStart(6, '0')}` },
                            ]}
                        />
                        <Text style={styles.legendText}>{type}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        maxWidth: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    legendList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 14,
    },
});

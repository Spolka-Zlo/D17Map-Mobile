import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { ReservationWithClassRoomInfo } from '@/constants/types';
import ListElement from '@/components/ListElement';
import InfoModal from '@/components/InfoModal';
import Colors from '@/constants/Colors';
import { formatTime } from '@/app/utils/timeUtils';
import { useState } from 'react';
import { useRemoveRecurringReservation } from '@/services/reservationService';
import { Spinner } from '@/components/Spinner';

type ReservationListProps = {
    reservations: ReservationWithClassRoomInfo[];
    setReservation: (reservation: ReservationWithClassRoomInfo) => void;
};

type ExpandedGroupsState = {
    [key: string]: boolean;
};

const ReservationList: React.FC<ReservationListProps> = ({
    reservations,
    setReservation,
}) => {
    const [expandedGroups, setExpandedGroups] = useState<ExpandedGroupsState>({});
    const {
        mutate: deleteRecurringReservation,
        isLoading: isDeleting,
        isError: deleteError,
        reset: resetDeleteError,
    } = useRemoveRecurringReservation();

    const groupedReservations = reservations.reduce<ReservationWithClassRoomInfo[][]>((acc, reservation) => {
        if (!reservation.recurringId) {
            acc.push([reservation]);
            return acc;
        }
        const found = acc.find(
            (group) => group[0].recurringId === reservation.recurringId
        );
        if (found) {
            found.push(reservation);
        } else {
            acc.push([reservation]);
        }
        return acc;
    }, []);

    const toggleGroupExpand = (recurringId: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [recurringId]: !prev[recurringId],
        }));
    };

    const confirmDeleteRecurringReservation = (recurringId: string) => {
        Alert.alert(
            'Potwierdzenie',
            'Czy na pewno chcesz usunąć tę rezerwację?',
            [
                {
                    text: 'Anuluj',
                    style: 'cancel',
                },
                {
                    text: 'Usuń',
                    style: 'destructive',
                    onPress: () => handleDeleteRecurringReservation(recurringId),
                },
            ]
        );
    };

    const handleDeleteRecurringReservation = (recurringId: string) => {
        deleteRecurringReservation(recurringId);
    };

    const renderSingleReservation = (reservation: ReservationWithClassRoomInfo) => (
        <ListElement
            key={reservation.id}
            text={`${reservation.title} - ${reservation.date} ${formatTime(
                reservation.startTime
            )}-${formatTime(reservation.endTime)}`}
            onPress={() => setReservation(reservation)}
            textStyle={{
                fontSize: 16,
                color: Colors.secondary,
            }}
        />
    );

    const renderRecurringReservation = (group: ReservationWithClassRoomInfo[]) => {
        const isExpand = expandedGroups[group[0].recurringId!] || false;
        return (
            <View key={group[0].recurringId} style={styles.recurringGroup}>
                <ListElement
                    text={`${group[0].title} - rezerwacja cykliczna`}
                    onPress={() => toggleGroupExpand(group[0].recurringId!)}
                    textStyle={{
                        fontSize: 16,
                        color: Colors.secondary,
                    }}
                    isRecurring
                />
                {isExpand && (
                    <View style={styles.expandedGroup}>
                        {group.map((reservation) => (
                            <ListElement
                                key={reservation.id}
                                text={`${reservation.title} - ${
                                    reservation.date
                                } ${formatTime(
                                    reservation.startTime
                                )}-${formatTime(reservation.endTime)}`}
                                onPress={() => setReservation(reservation)}
                                textStyle={{
                                    fontSize: 16,
                                    color: Colors.secondary,
                                }}
                            />
                        ))}
                        <ListElement
                            text="Usuń rezerwację"
                            onPress={() => confirmDeleteRecurringReservation(group[0].recurringId!)}
                            textStyle={{
                                fontSize: 16,
                                color: 'red',
                            }}
                        />
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Spinner isLoading={isDeleting} text="Usuwanie rezerwacji..." />
            <InfoModal
                text="Nie udało się usunąć rezerwacji"
                visible={deleteError}
                onClose={resetDeleteError}
            />
            <ScrollView style={{ width: '90%' }}>
                <View style={styles.container}>
                    {groupedReservations.map((group) =>
                        group.length === 1
                            ? renderSingleReservation(group[0])
                            : renderRecurringReservation(group)
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16,
        marginBottom: 100,
        width: '100%',
    },
    recurringGroup: {
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        width: '100%',
        borderRadius: 8,
    },
    expandedGroup: {
        // padding: 8,
        backgroundColor: Colors.primary,
        borderRadius: 8,
    },
});

export default ReservationList;

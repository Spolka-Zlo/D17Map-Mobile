import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Colors from '@/constants/Colors';
import { Styles } from '@/constants/Styles';
import { useDeleteReservation, useEditReservation } from '@/services/reservationService';
import InfoModal from '@/app/modals/errrorModal';
import { OrangeButton } from '@/components/OrangeButton';
import Dropdown from '@/components/Dropdown';
import { Reservation } from '@/constants/types';
import { useReservationTypes } from '@/services/reservationTypeService';

type ReservationManagerProps = {
    reservation: Reservation;
    setReservation: Dispatch<SetStateAction<Reservation | null>>;
};

export default function ReservationManager(props: ReservationManagerProps) {
    const deleteMutation = useDeleteReservation();
    const editMutation = useEditReservation();
    const { reservationTypes } = useReservationTypes();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.reservation?.title || '');
    const [editedDescription, setEditedDescription] = useState(props.reservation?.description || '');
    const [selectedClassroomId, setSelectedClassroomId] = useState(props.reservation?.classroomId || '');
    const [selectedReservationType, setSelectedReservationType] = useState(props.reservation?.type || '');
    const [numberOfParticipants, setNumberOfParticipants] = useState(props.reservation?.numberOfParticipants || 0);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    const handleEdit = () => {
        if (props.reservation) {
            editMutation.mutate({
                id: props.reservation.id,
                title: editedTitle,
                description: editedDescription,
                classroomId: selectedClassroomId,
                type: selectedReservationType,
                numberOfParticipants,
            });
        }
    };

    return (
        <View>
            {deleteMutation.isSuccess && (
                <InfoModal
                    text="Rezerwacja usunięta"
                    visible={deleteMutation.isSuccess}
                    onClose={() => props.setReservation(null)}
                />
            )}
            {deleteMutation.isError ? (
                <InfoModal
                    text="Nie udało się usunąć rezerwacji"
                    visible={deleteMutation.isError}
                    onClose={() => deleteMutation.reset()}
                />
            ) : (
                <View>
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
                            <View
                                style={styles.flex}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                <View style={styles.box}>
                                    <Text style={Styles.h2}>Edytuj Rezerwację</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Tytuł"
                                        value={editedTitle}
                                        onChangeText={setEditedTitle}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Opis"
                                        value={editedDescription}
                                        onChangeText={setEditedDescription}
                                    />
                                    <Dropdown
                                        options={reservationTypes!}
                                        selected={selectedReservationType}
                                        setSelected={setSelectedReservationType}
                                        isOpen={isDropDownOpen}
                                        setIsOpen={setIsDropDownOpen}
                                    />
                                    <Dropdown
                                        options={[]} // Zostawiamy puste, na razie nie ma dostępnych pokoi
                                        selected={selectedClassroomId}
                                        setSelected={setSelectedClassroomId}
                                        isOpen={isDropDownOpen}
                                        setIsOpen={setIsDropDownOpen}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Liczba uczestników"
                                        value={String(numberOfParticipants)}
                                        keyboardType="numeric"
                                        onChangeText={(text) => setNumberOfParticipants(Number(text))}
                                    />
                                    <OrangeButton
                                        text="Zapisz"
                                        onPress={() => {
                                            handleEdit();
                                            setIsEditModalVisible(false);
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsEditModalVisible(false)}
                                        style={styles.errorButton}
                                    >
                                        <Text style={styles.errorButtonText}>Anuluj</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )}
        </View>
    );
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
    },
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
    },
});

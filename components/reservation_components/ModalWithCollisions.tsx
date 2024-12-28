import Colors from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ModalWithCollisionsProps = {
    visible: boolean
    collisions: string[]
    confirm: () => void
    reject: () => void
    handleExit: () => void
}

export default function ModalWithCollisions(props: ModalWithCollisionsProps) {
    const [timeLeft, setTimeLeft] = useState(60)
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false)

    useEffect(() => {
        if (props.visible) {
            setTimeLeft(60)
            setShowTimeoutMessage(false)
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [props.visible])

    useEffect(() => {
        if (timeLeft === 0) {
            setShowTimeoutMessage(true)
            props.reject()
        }
    }, [timeLeft])

    return (
        <Modal animationType="fade" transparent={true} visible={props.visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {showTimeoutMessage ? (
                        <>
                            <Text style={styles.titleText}>
                                Rezerwacja anulowana
                            </Text>
                            <Text style={styles.modalText}>
                                Rezerwacja nie została utworzona z powodu braku
                                odpowiedzi w wyznaczonym czasie.
                            </Text>
                            <TouchableOpacity
                                style={styles.exitButton}
                                onPress={props.handleExit}
                            >
                                <Text style={styles.buttonText}>Powrót</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.titleText}>
                                Kolizje Terminów
                            </Text>
                            <Text style={styles.modalText}>
                                Podczas rezerwacji wystąpiły kolizje w
                                terminach:
                            </Text>
                            <View style={styles.collisionsContainer}>
                                {props.collisions.map((collision, index) => (
                                    <Text
                                        key={index}
                                        style={styles.collisionText}
                                    >
                                        {collision}
                                        {index < props.collisions.length - 1
                                            ? ','
                                            : ''}
                                    </Text>
                                ))}
                            </View>
                            <Text style={styles.modalText}>
                                Czy chcesz kontynuować z rezerwacjami poza tymi
                                terminami?
                            </Text>
                            <Text style={styles.timerText}>
                                Czas na odpowiedź: {timeLeft} sekund
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={props.confirm}
                                >
                                    <Text style={styles.buttonText}>Tak</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.rejectButton}
                                    onPress={() => {
                                        props.reject()
                                        props.handleExit()
                                    }}
                                >
                                    <Text style={styles.buttonText}>Nie</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    collisionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    collisionText: {
        fontSize: 14,
        marginHorizontal: 4,
    },
    timerText: {
        fontSize: 16,
        color: '#FF0000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: '#F44336',
        paddingVertical: 15,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    exitButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

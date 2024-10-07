import Colors from '@/constants/Colors'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


type InfoModalProps = {
    text: string
    visible: boolean
    onClose: () => void
}


export default function InfoModal(props: InfoModalProps) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {props.text}
            </Text>
            <TouchableOpacity onPress={props.onClose} style={styles.button}>
              <Text style={styles.buttonText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2F2F2',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: '#003F63',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      color: '#F2F2F2',
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 15,
    },
    button: {
      backgroundColor: Colors.secondary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#003F63',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

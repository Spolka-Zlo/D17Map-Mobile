import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, View, Text } from 'react-native'

export default function ModalScreen() {
  
    return (
      <View style={styles.container}>
        <Text>Modal screen</Text>
       <Link href="../">Dismiss modal</Link>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

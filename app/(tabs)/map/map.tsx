import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'expo-router'


export default function Map() {

    return (
        <View style={{backgroundColor: "white"}}>
            <Text >Reservations</Text>
            <View/>
            <Text>
                Choose a room:
                <Link href="/(tabs)/map/1">Floor 1</Link>
                <Link href="/(tabs)/map/2">Floor 2</Link>
            </Text>
        </View>
    )
}

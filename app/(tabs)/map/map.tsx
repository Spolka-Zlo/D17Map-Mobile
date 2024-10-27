import React, { Suspense, useEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment } from '@react-three/drei/native'
import Floor1 from '@/assets/models/floor1.glb'
import Floor2 from '@/assets/models/floor2.glb'
import Dropdown from '@/components/Dropdown'
import { View, Text } from '@/components/Themed'
import { Link, router } from 'expo-router'


const models: Record<string, string> = {
    'floor1': Floor1,
    'floor2': Floor2,
}

export default function Map() {

    return (
        <View >
            <Text>Reservations</Text>
            <View/>
            <Text>
                Choose a room:
                <Link href="/(tabs)/map/1">Floor 1</Link>
                <Link href="/(tabs)/map/2">Floor 2</Link>
            </Text>
        </View>
    )
}

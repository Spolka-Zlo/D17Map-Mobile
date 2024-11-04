import { View, StyleSheet } from 'react-native'
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { Environment } from '@react-three/drei/native'
import { useLocalSearchParams } from 'expo-router'
import useControls from 'r3f-native-orbitcontrols'
import { Model } from '@/components/map_components/Model'
import { ChangeFloorPanel } from '@/components/map_components/ChangeFloorPanel'
import { Spinner } from '@/components/Spinner'
import { RoomInfoPanel } from '@/components/map_components/RoomInfoPanel'
import Colors from '@/constants/Colors'
import { useClassrooms } from '@/services/classroomService'
import { Room } from '@/constants/types'

export default function Floor() {
    const { floor } = useLocalSearchParams()
    const floorNumber = typeof floor === 'string' ? parseInt(floor, 10) : 0
    const [OrbitControls, events] = useControls()
    const [modelLoading, setModelLoading] = useState(true)
    let activeRoomsKeys: string[] = []
    let selectedRoom: Room | null = null

    const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(null)
    const { rooms } = useClassrooms() // to change with useFloorClassrooms
    
    if (rooms) {
        const roomsWithKey = rooms.map((room: Room) => ({
            ...room,
            modelKey: room.name.replace(/\./g, ''),
        }))
        activeRoomsKeys = roomsWithKey
            .filter((room: Room) => room.modelKey !== null)
            .map((room: Room) => room.modelKey)

        selectedRoom = roomsWithKey.find(
            (room: Room) => room.modelKey === selectedRoomKey
        )
    }

    return (
        <View
            style={styles.container}
            pointerEvents={modelLoading ? 'none' : 'auto'}
        >
            <Spinner isLoading={modelLoading} />
            <ChangeFloorPanel floor={floorNumber} />
            <View style={styles.canvasElement} {...events}>
                <Canvas>
                    <OrbitControls
                        minZoom={2}
                        maxZoom={100}
                        enablePan
                        ignoreQuickPress
                    />
                    <directionalLight
                        intensity={1.1}
                        position={[0.5, 0, 0.866]}
                    />
                    <directionalLight intensity={0.8} position={[0, 2, 2]} />
                    <ambientLight />
                    <Suspense fallback={null}>
                        <Environment preset="park" />
                        {typeof floor === 'string' && (
                            <Model
                                model={floorNumber}
                                onLoad={() => setModelLoading(false)}
                                selectedRoomKey={selectedRoomKey}
                                setSelectedRoomKey={setSelectedRoomKey}
                                activeRoomsKeys={activeRoomsKeys}
                            />
                        )}
                    </Suspense>
                </Canvas>
            </View>
            {rooms && <RoomInfoPanel room={selectedRoom} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mapGrey,
    },
    canvasElement: {
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
})

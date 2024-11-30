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
import Colors, { colorMapping } from '@/constants/Colors'
import { useClassrooms, useExtraRooms } from '@/services/classroomService'
import { ExtraRoom, Room } from '@/constants/types'
import { Legend } from '@/components/map_components/Legend'

export default function Floor() {
    const { floor } = useLocalSearchParams()
    const floorNumber = typeof floor === 'string' ? parseInt(floor, 10) : 0
    const [OrbitControls, events] = useControls()
    const [modelLoading, setModelLoading] = useState(true)
    let activeRoomsKeys: string[] = []
    let selectedRoom: Room | ExtraRoom | null = null
    const extraRoomColors: Record<string, number> = {}

    const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(null)
    const { rooms } = useClassrooms() // to change with useFloorClassrooms
    const { extraRooms } = useExtraRooms()

    if (rooms && extraRooms) {
        activeRoomsKeys =
            rooms.map((room: Room) => room.modelKey) +
            extraRooms.map((room: ExtraRoom) => room.modelKey)

        selectedRoom =
            rooms.find((room: Room) => room.modelKey === selectedRoomKey) ||
            extraRooms.find(
                (room: ExtraRoom) => room.modelKey === selectedRoomKey
            )
        for (const room of extraRooms) {
            if (room.type in colorMapping) {
                const color = colorMapping[room.type]
                extraRoomColors[room.modelKey] = color
            }
        }
    }

    return (
        <View
            style={styles.container}
            pointerEvents={modelLoading ? 'none' : 'auto'}
        >
            <Spinner isLoading={modelLoading} />
            <Legend extraRooms={extraRooms} />
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
                                extraRoomColors={extraRoomColors}
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

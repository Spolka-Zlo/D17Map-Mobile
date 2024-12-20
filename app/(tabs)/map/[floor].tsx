import { View, StyleSheet } from 'react-native'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { Environment } from '@react-three/drei/native'
import { useLocalSearchParams } from 'expo-router'
import useControls from 'r3f-native-orbitcontrols'
import { Model } from '@/components/map_components/Model'
import { ChangeFloorPanel } from '@/components/map_components/ChangeFloorPanel'
import { Spinner } from '@/components/Spinner'
import { RoomInfoPanel } from '@/components/map_components/RoomInfoPanel'
import Colors, { colorMapping } from '@/constants/Colors'
import { useClassrooms, useExtraRooms, useFloors } from '@/services/classroomService'
import { ExtraRoom, Floor, Room } from '@/constants/types'
import { Legend } from '@/components/map_components/Legend'
import { Mesh, PerspectiveCamera } from 'three'
import { gsap } from 'gsap'

export default function FloorComponent() {
    const { floor, key } = useLocalSearchParams()
    const floorNumber = typeof floor === 'string' ? floor : '1'
    const [OrbitControls, events] = useControls()
    const [modelLoading, setModelLoading] = useState(true)
    let activeRoomsKeys: string[] = []
    let selectedRoom: Room | ExtraRoom | null = null
    const extraRoomColors: Record<string, number> = {}

    const [selectedRoomKey, setSelectedRoomKey] = useState<string | null>(
        typeof key === 'string' ? key : Array.isArray(key) ? key[0] : null
    )
    const { rooms } = useClassrooms()
    const { extraRooms } = useExtraRooms()

    if (rooms && extraRooms) {
        activeRoomsKeys = rooms
            .map((room: Room) => room.modelKey)
            .concat(extraRooms.map((room: ExtraRoom) => room.modelKey))

        selectedRoom =
            rooms.find((room: Room) => room.modelKey === selectedRoomKey) ||
            extraRooms.find(
                (room: ExtraRoom) => room.modelKey === selectedRoomKey
            )
        for (const room of extraRooms) {
            if (room.type in colorMapping) {
                const color = colorMapping[room.type]
                extraRoomColors[room.modelKey] = color
            } else {
                extraRoomColors[room.modelKey] = colorMapping.default
            }
        }
    }

    const { floors } = useFloors()
    const availableFloors = floors?.map((floor: Floor) => floor.floorName).sort() 

    const [camera] = useState(new PerspectiveCamera())

    const setCameraPosition = (
        x: number,
        y: number,
        z: number,
        target: Mesh
    ) => {
        gsap.to(camera.position, {
            x,
            y,
            z,
            duration: 1,
            ease: 'power1.inOut',
            onUpdate: () => {
                camera.lookAt(target.position)
                camera.updateProjectionMatrix()
            },
        })
    }

    useEffect(() => {
        camera.position.set(0, -20, 36)
    }, [camera])

    return (
        <View
            style={styles.container}
            pointerEvents={modelLoading ? 'none' : 'auto'}
        >
            <Spinner isLoading={modelLoading} />
            <Legend extraRooms={extraRooms} />
            <ChangeFloorPanel floor={floorNumber} availableFloors={availableFloors}/>
            <View style={styles.canvasElement} {...events}>
                <Canvas camera={camera}>
                    <OrbitControls minZoom={2} maxZoom={100} ignoreQuickPress />
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
                                setCameraPosition={setCameraPosition}
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

import { useGLTF } from '@react-three/drei/native'
import Floor1 from '@/assets/models/floor1_2.glb'
import Floor2 from '@/assets/models/floor2.glb'
import Floor3 from '@/assets/models/floor3.glb'
import Floor4 from '@/assets/models/floor4.glb'
import { Mesh, MeshStandardMaterial, Vector3 } from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useRef } from 'react'
import React from 'react'

const models: Record<string, string> = {
    1: Floor1,
    2: Floor2,
    3: Floor3,
    4: Floor4,
}

type ModelProps = {
    model: number
    onLoad?: () => void
    selectedRoomKey: string | null
    setSelectedRoomKey: (key: string | null) => void
    activeRoomsKeys: string[]
    extraRoomColors: Record<string, number>
    setCameraPosition: (x: number, y: number, z: number, target: Mesh) => void
}

export const Model = (props: ModelProps) => {
    const gltf_model = models[props.model]
    const { nodes } = useGLTF(gltf_model)
    const meshRefs = useRef<{ [key: string]: Mesh }>({})

    useEffect(() => {
        if (nodes) {
            if (props.onLoad) {
                props.onLoad()
            }
        }
    }, [nodes, props])

    // const loader = new GLTFLoader()
    // loader.load(
    //     // "http://192.168.33.12:8080/equipments",
    //     require('@/assets/models/floor1_2.glb'),
    //     (gltf) => {
    //         console.log('loaded', gltf)
    //     },
    //     () => {},
    //     (error) => {
    //         console.log('An error happened', error)
    //     }
    // )

    useEffect(() => {
        if (nodes) {
            Object.entries(nodes).forEach(([key, node]) => {
                if (node instanceof Mesh) {
                    const mesh = meshRefs.current[key]
                    if (mesh) {
                        const originalMaterial =
                            node.material as MeshStandardMaterial
                        const newMaterial = originalMaterial.clone()
                        const newPosition = new Vector3().copy(mesh.position)
                        if (
                            key === props.selectedRoomKey &&
                            props.activeRoomsKeys.includes(key)
                        ) {
                            newMaterial.color.set(0xf6a200)
                            newPosition.z += 0.3
                            console.log('newPosition', newPosition)
                            props.setCameraPosition(
                                3 * newPosition.x,
                                3 * newPosition.y,
                                9,
                                mesh
                            )
                        } else if (props.extraRoomColors[key]) {
                            newMaterial.color.set(props.extraRoomColors[key]);
                            newPosition.z = node.position.z;
                        } else if (props.activeRoomsKeys.includes(key)) {
                            newMaterial.color.set(0x6fd8ed)
                            newPosition.z = node.position.z
                        } else {
                            newMaterial.color.set(0xffffff)
                            newPosition.z = node.position.z
                        }
                        mesh.material = newMaterial
                        mesh.position.copy(newPosition)
                    }
                }
            })
        }
    }, [nodes, props.selectedRoomKey, props.activeRoomsKeys])

    return (
        <>
            <group>
                {Object.entries(nodes).map(([key, node]) => (
                    <React.Fragment key={key}>
                        {node instanceof Mesh && (
                            <mesh
                                ref={(el) => {
                                    if (el) meshRefs.current[key] = el
                                }}
                                geometry={node.geometry}
                                material={node.material}
                                position={node.position}
                                rotation={node.rotation}
                                scale={node.scale}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    props.setSelectedRoomKey(
                                        props.selectedRoomKey === key
                                            ? null
                                            : key
                                    )
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </group>
        </>
    )
}

useGLTF.preload(Floor1)
useGLTF.preload(Floor2)
useGLTF.preload(Floor3)
useGLTF.preload(Floor4)

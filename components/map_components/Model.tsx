import { useGLTF } from '@react-three/drei/native'
import Floor1 from '@/assets/models/floor1_2.glb'
import Floor2 from '@/assets/models/floor2.glb'
import { Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { RoomInfoPanel } from './RoomInfoPanel'

const models: Record<string, string> = {
    1: Floor1,
    2: Floor2,
    3: Floor1,
    4: Floor2,
}

const activeRooms = ['138', '119', '122', '110']


type ModelProps = {
    model: number
    onLoad?: () => void
    selectedRoomKey: string | null
    setSelectedRoomKey: (key: string | null) => void
}

export const Model = (props: ModelProps) => {
    const gltf_model = models[props.model]
    const { nodes, materials } = useGLTF(gltf_model)
    const meshRefs = useRef<{ [key: string]: Mesh }>({})

    useEffect(() => {
        if (nodes) {
            if (props.onLoad) {
                props.onLoad()
            }
        }
    }, [nodes, props])

    useEffect(() => {
        if (nodes) {
            Object.entries(nodes).forEach(([key, node]) => {
                if (node instanceof Mesh) {
                    const mesh = meshRefs.current[key]
                    if (mesh) {
                        const originalMaterial =
                            node.material as MeshStandardMaterial
                        const newMaterial = originalMaterial.clone()
                        const newPosition = new Vector3().copy(mesh.position);
                        if (key === props.selectedRoomKey) {
                            newMaterial.color.set(0xf6a200)
                            newPosition.z += 0.3;
                        } else if (key.includes('TEXT')) {
                            newPosition.z = node.position.z;
                            newMaterial.color.set(0x000000);
                        } else if (activeRooms.includes(key)) {
                            newMaterial.color.set(0x6fd8ed)
                            newPosition.z = node.position.z;
                        } else {
                            newMaterial.color.set(0xffffff);
                            newPosition.z = node.position.z;
                        }
                        mesh.material = newMaterial
                        mesh.position.copy(newPosition);
                    }
                }
            })
        }
    }, [nodes, props.selectedRoomKey])

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
                                    if (!key.includes('TEXT')){
                                        props.setSelectedRoomKey(
                                            props.selectedRoomKey === key ? null : key
                                        )
                                    }
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

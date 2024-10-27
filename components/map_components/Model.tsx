import { useGLTF } from '@react-three/drei/native';
import Floor1 from '@/assets/models/floor1_2.glb';
import Floor2 from '@/assets/models/floor2.glb';
import { Mesh, MeshStandardMaterial } from 'three';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

const models: Record<string, string> = {
    1: Floor1,
    2: Floor2,
    3: Floor1,
    4: Floor2,
};

const activeRooms = ['138', '119', '122', '110'];

export const Model = (props: { model: number; onLoad?: () => void }) => {
    const gltf_model = models[props.model];
    const { nodes, materials } = useGLTF(gltf_model);
    const meshRefs = useRef<{ [key: string]: Mesh }>({});
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (nodes) {
            setIsLoaded(true);
            if (props.onLoad) {
                props.onLoad();
            }
        }
    }, [nodes, props]);

    useEffect(() => {
        if (nodes) {
            Object.entries(nodes).forEach(([key, node]) => {
                if (node instanceof Mesh) {
                    const mesh = meshRefs.current[key];
                    if (mesh) {
                        const originalMaterial = node.material as MeshStandardMaterial;
                        const newMaterial = originalMaterial.clone();
                        if (key === selectedRoom) {
                            newMaterial.color.set(0xf6a200);
                        } else if (activeRooms.includes(key)) {
                            newMaterial.color.set(0x6fd8ed);
                        } else {
                            newMaterial.color.set(0xffffff);
                        }
                        mesh.material = newMaterial;
                    }
                }
            });
        }
    }, [nodes, selectedRoom]);

    return (
        <group>
            {Object.entries(nodes).map(([key, node]) => (
                <React.Fragment key={key}>
                    {node instanceof Mesh && (
                        <mesh
                            ref={(el) => {
                                if (el) meshRefs.current[key] = el;
                            }}
                            geometry={node.geometry}
                            material={node.material}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(selectedRoom === key ? null : key);
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </group>
    );
};

useGLTF.preload(Floor1);
useGLTF.preload(Floor2);


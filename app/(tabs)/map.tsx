import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import * as THREE from 'three' // Add this line
import { Mesh } from 'three'

function Laptop() {
    const { nodes, materials } = useGLTF('../assets/models/1floor3D2.glb')
    const meshRefs = useRef<{ [key: string]: Mesh }>({});
    return (
        <group>
      {Object.entries(nodes).map(([key, node]) => (
        <mesh
          key={key}
          ref={(el) => {
            meshRefs.current[key] = el!;
          }}
          geometry={(node as Mesh).geometry}
          material={(node as Mesh).material}
          position={node.position}
          rotation={node.rotation}
          scale={node.scale}
        />
      ))}
    </group>
    )
}

export default function Home() {
    return (
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Laptop />
            <PerspectiveCamera makeDefault position={[0, 2, 15]} />
            <OrbitControls />
        </Canvas>
    )
}

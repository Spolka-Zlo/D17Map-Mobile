import React, { Suspense } from 'react'
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment } from '@react-three/drei/native'
import Floor1 from '../../assets/models/floor3D21.glb';

function Model() {
  const { scene } = useGLTF(Floor1)
  useFrame(() => (scene.rotation.y += 0.01))
  return <primitive object={scene} />
}

export default function Home() {
  return (
    <Canvas camera={{ position: [-6, 0, 16], fov: 100 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        <Model/>
      </Suspense>
    </Canvas>
  )
}

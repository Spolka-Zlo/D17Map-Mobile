import React, { Suspense, useEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment } from '@react-three/drei/native'
import Floor1 from '@/assets/models/floor1.glb'
import Floor2 from '@/assets/models/floor2.glb'
import Dropdown from '@/components/Dropdown'
import { View } from '@/components/Themed'


const models: Record<string, string> = {
    'floor1': Floor1,
    'floor2': Floor2,
}

export default function Map() {
    const [model, setModel] = React.useState('floor1')
    const [isOpen, setIsOpen] = React.useState(false)

    function Model(props: { model1: string }) {
        const gltf_model = models[model]
        const { scene } = useGLTF(gltf_model)
        // useFrame(() => (scene.rotation.y += 0.01))
        // reload model
        console.log('model reloaded')
        if (props.model1 === model) {
            return <primitive object={scene}/>
        }
        return <primitive object={scene}/>
    }

    console.log(model)
    return (
        <>
        <View style={{position: 'absolute', top: 0, left: 0, zIndex: 1000}}>
            <Dropdown options={['floor1', 'floor2']} selected={model} setSelected={setModel} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </View>
            <Canvas camera={{ position: [-6, 0, 16], fov: 100 }}>
                <color attach="background" args={[0xe2f4df]} />
                <ambientLight />
                <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
                <directionalLight intensity={0.8} position={[-6, 2, 2]} />
                <Suspense>
                    <Environment preset="park" />
                    <Model model1='floor1' />
                    {/* <Model model='floor2'/> */}
                </Suspense>
            </Canvas>
        </>
    )
}

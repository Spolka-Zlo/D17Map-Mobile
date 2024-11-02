import { Canvas } from '@react-three/fiber/native'
import { useRef, Suspense, useState, useEffect } from 'react'
import { TextureLoader } from 'expo-three'
import useControls from 'r3f-native-orbitcontrols'
import { View, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import * as THREE from 'three'

// function Sphere(props: any) {
//     const [texture, setTexture] = useState<Texture | null>(null)
//     const mesh = useRef()
    
//     useEffect(() => {
//         const textureLoader = new TextureLoader()
//         textureLoader.load(
//             require('@/assets/images/120.jpg'),
//             // "http://192.168.33.12:8080/classrooms/1/photo.jpg",
//             (loadedTexture) => {
//                 console.log(
//                     'TEXTURE LOADER',
//                     loadedTexture.image,
//                 )
//                 setTexture(loadedTexture)
//             },
//             () => {},
//             (error) => {
//                 console.log('An error happened', error)
//             }
//         )
//     }, [])
    
//     return (
//         <mesh {...props} ref={mesh}>
//             <sphereGeometry args={[1, 32, 32]} />
//             <meshStandardMaterial map={texture} />
//         </mesh>
//     )
// }

export default function SpherePhoto() {
    const [OrbitControls, events] = useControls()
    // const [texture, setTexture] = useState<Texture | null>(null)
    const mesh = useRef(null)

    const textureLoader = new TextureLoader()
    const url = require('@/assets/images/120.jpg')
    // const url = "http://192.168.33.12:8080/classrooms/1/photo.jpg"
    const texture = textureLoader.load(url)


    return (
        <View style={styles.container} {...events}>
            <Canvas style={styles.canvas}>
                <OrbitControls
                    minZoom={2}
                    maxZoom={2}
                    enablePan={false}
                    enableZoom={false}
                />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    {/* <Sphere position={[0, 0, 0]} /> */}
                    <mesh position={[0, 0, 0]} ref={mesh}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial map={texture} />
                    </mesh>
                </Suspense>
            </Canvas>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 200,
        height: 200,
        width: 200,
        zIndex: 0,
    },
    canvas: {
        width: '100%',
        height: '100%',
    }
})

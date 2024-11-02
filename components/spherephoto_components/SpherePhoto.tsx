import { Canvas } from '@react-three/fiber/native'
import { useRef, Suspense } from 'react'
import { TextureLoader } from 'expo-three'
import useControls from 'r3f-native-orbitcontrols'
import { View, StyleSheet } from 'react-native'
import Photo120 from '@/assets/images/120.jpg'
import Colors from '@/constants/Colors'
import { PerspectiveCamera } from 'three'


export default function SpherePhoto() {
    const [OrbitControls, events] = useControls()
    const mesh = useRef(null)

    const textureLoader = new TextureLoader()
    const url = Photo120
    // const url = "http://192.168.33.12:8080/classrooms/1/photo.jpg"
    const texture = textureLoader.load(url)
    const camera = new PerspectiveCamera()
    camera.position.set(0, 0, 2.9)


    return (
        <View style={styles.container} {...events}>
            <Canvas style={styles.canvas} camera={camera}>
                <OrbitControls
                    minZoom={2}
                    maxZoom={2}
                    enablePan={false}
                    enableZoom={false}
                    rotateSpeed={0.3}
                />
                <ambientLight intensity={1.5}/>
                <pointLight position={[4, 4, 4]} />
                <Suspense fallback={null}>
                    <mesh position={[0, 0, 0]} ref={mesh}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <meshStandardMaterial map={texture}/>
                    </mesh>
                </Suspense>
            </Canvas>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mapGrey,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 400,
        height: 400,
        width: '100%',
        zIndex: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    canvas: {
        width: '100%',
        height: '100%',
    }
})

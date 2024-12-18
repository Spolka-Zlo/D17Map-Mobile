import { Canvas } from '@react-three/fiber/native'
import { useRef, Suspense, useState, useEffect } from 'react'
import { TextureLoader } from 'expo-three'
import useControls from 'r3f-native-orbitcontrols'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'

type SpherePhotoProps = {
    imageUrl: string
}

export default function SpherePhoto(props: SpherePhotoProps) {
    const [OrbitControls, events] = useControls()
    const mesh = useRef(null)
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const textureLoader = new TextureLoader()
    useEffect(() => {
        setLoading(true)
        setError(false)
        const timeoutId = setTimeout(() => {
            setLoading(false)
            setError(true)
        }, 2000)
        try {
            textureLoader.load(
                props.imageUrl,
                () => {
                    clearTimeout(timeoutId)
                    setLoading(false)
                },
                undefined,
                () => {
                    clearTimeout(timeoutId)
                    setLoading(false)
                    setError(true)
                }
            )
        } catch (e) {
            clearTimeout(timeoutId)
            setLoading(false)
            setError(true)
            console.error("Błąd podczas ładowania tekstury:", e)
        }
        return () => clearTimeout(timeoutId)
    }, [props.imageUrl])

    if (loading) {
        return (
            <View style={styles.container2} {...events}>
                <Text style={styles.loadingText}>Ładowanie zdjęcia...</Text>
            </View>
        )
    }

    if (error && !loading) {
        return (
            <View style={styles.container2} {...events}>
                <Text style={styles.errorText}>Brak zdjęcia</Text>
            </View>
        )
    }

    return (
        <View style={styles.container} {...events}>
            <Canvas style={styles.canvas}>
                <OrbitControls
                    minZoom={1.47}
                    maxZoom={1.47}
                    enablePan={false}
                    rotateSpeed={0.2}
                />
                <ambientLight intensity={1.5} />
                <pointLight position={[4, 4, 4]} />
                <Suspense fallback={null}>
                    <mesh position={[0, 0, 0]} ref={mesh}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial map={textureLoader.load(props.imageUrl)} />
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
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 400,
        height: 400,
        width: '100%',
        zIndex: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },
    container2: {
        flex: 1,
        backgroundColor: Colors.white,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 400,
        height: 400,
        width: '100%',
        zIndex: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },

    canvas: {
        width: '100%',
        height: '100%',
    },
    loadingText: {
        position: 'absolute',
        top: '50%',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    errorText: {
        position: 'absolute',
        top: '50%',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    }
})
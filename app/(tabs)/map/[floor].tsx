import { View, StyleSheet } from 'react-native';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { Environment } from '@react-three/drei/native';
import { useLocalSearchParams } from 'expo-router';
import useControls from 'r3f-native-orbitcontrols';
import { Model } from '@/components/map_components/Model';
import { ChangeFloorPanel } from '@/components/map_components/ChangeFloorPanel';
import { Spinner } from '@/components/Spinner';

export default function Floor() {
    const { floor } = useLocalSearchParams();
    const floorNumber = typeof floor === 'string' ? parseInt(floor, 10) : 0;
    const [OrbitControls, events] = useControls();
    const [modelLoading, setModelLoading] = useState(true);    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Spinner
                isLoading={modelLoading}
            />
            {ChangeFloorPanel(floorNumber)}
            <View style={styles.canvasElement} {...events}>
                <Canvas>
                    <OrbitControls minZoom={2} maxZoom={100} enablePan ignoreQuickPress />
                    <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
                    <directionalLight intensity={0.8} position={[-6, 2, 2]} />
                    <ambientLight />
                    <Suspense fallback={null}>
                        <Environment preset="park" />
                        {typeof floor === 'string' && (
                            <Model
                                model={parseInt(floor, 10)}
                                onLoad={() => setModelLoading(false)}
                            />
                        )}
                    </Suspense>
                </Canvas>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    canvasElement: {
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
});
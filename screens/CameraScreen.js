import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
    const [permission, request] = Camera.useCameraPermissions();
    const [ready, setReady] = useState(false);

    useEffect(() => { if (!permission) request(); }, [permission]);

    if (!permission?.granted) return <View style={styles.container} />;

    return (
        <Camera
            style={StyleSheet.absoluteFill}
            onCameraReady={() => setReady(true)}
            ratio="4:3"
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
});

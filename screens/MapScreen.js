import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView style={StyleSheet.absoluteFill} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});

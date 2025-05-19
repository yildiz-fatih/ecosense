// components/AnimatedSplash.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function AnimatedSplash({ onFinish }) {
    useEffect(() => {
        // once JS mounts, hide the native splash
        const handle = requestAnimationFrame(() =>
            SplashScreen.hideAsync().catch(() => { })
        );
        return () => cancelAnimationFrame(handle);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/spinner.json')}
                autoPlay
                loop={false}
                speed={1.5}
                onAnimationFinish={onFinish}
                style={{ width: 140, height: 140 }}
            />
            <Text style={styles.title}>EcoSense</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e7d32',       // your primary green
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 12,
        fontSize: 36,
        fontWeight: '600',
        color: '#81c784',                  // a lighter green
    },
});

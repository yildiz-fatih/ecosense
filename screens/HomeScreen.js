import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthProvider';

export default function HomeScreen() {
    const { user } = useAuth();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, {user?.username} 👋</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 24, fontWeight: '700' },
    sub: { marginTop: 8, fontSize: 16, color: '#666' },
});

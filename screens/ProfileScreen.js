import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { CATEGORIES, useAuth } from '../context/AuthProvider';

export default function ProfileScreen() {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <View style={styles.stats}>
                <Text style={styles.statTitle}>Recycling Stats</Text>
                <Text style={styles.stat}>Total: {user?.total}</Text>
                {CATEGORIES.map(c => (
                    <Text key={c} style={styles.stat}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}: {user?.counts?.[c] ?? 0}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => signOut(auth)}>
                <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '700', marginTop: 24 },
    email: { fontSize: 16, color: '#555', marginBottom: 24 },
    stats: { width: '100%', marginVertical: 16 },
    statTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    stat: { fontSize: 16, marginBottom: 4 },
    btn: { marginTop: 'auto', padding: 12, backgroundColor: '#222', borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16 },
});

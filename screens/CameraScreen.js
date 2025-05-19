import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { CATEGORIES, useAuth } from '../context/AuthProvider';

export default function CameraScreen() {
    const { user, setUser } = useAuth();
    const [busy, setBusy] = useState(false);

    // increment the chosen material (and total) for this user
    const addRecycle = async (cat) => {
        try {
            setBusy(true);
            const ref = doc(db, 'users', user.uid);

            // update in Firestore
            await updateDoc(ref, {
                total: increment(1),
                [`counts.${cat}`]: increment(1),
            });

            // update local state so UI is instant
            setUser((prev) => ({
                ...prev,
                total: prev.total + 1,
                counts: { ...prev.counts, [cat]: (prev.counts?.[cat] ?? 0) + 1 },
            }));
        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>📸  Mock Camera</Text>
            <Text style={styles.sub}>
                Tap a material to “pretend-scan” it. Stats & database will
                update exactly like the real model will later.
            </Text>

            {CATEGORIES.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={styles.btn}
                    onPress={() => addRecycle(cat)}
                    disabled={busy}
                >
                    <Text style={styles.btnText}>Add {cat}</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.stats}>
                <Text style={styles.statTitle}>Current totals</Text>
                <Text style={styles.stat}>All: {user.total}</Text>
                {CATEGORIES.map((c) => (
                    <Text key={c} style={styles.stat}>
                        {c}: {user.counts?.[c] ?? 0}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginTop: 24,
    },
    sub: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#555',
    },

    btn: {
        width: '100%',
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#1e90ff',
        marginBottom: 12,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },

    stats: {
        marginTop: 24,
        width: '100%',
    },
    statTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    stat: {
        fontSize: 16,
        marginBottom: 4,
    },
});

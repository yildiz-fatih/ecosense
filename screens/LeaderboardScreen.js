import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function LeaderboardScreen() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('total', 'desc'));
        const unsub = onSnapshot(q, snap => {
            setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.container}
            renderItem={({ item, index }) => (
                <View style={styles.row}>
                    <Text style={styles.rank}>{index + 1}</Text>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.score}>{item.total}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    rank: { width: 32, fontSize: 18, fontWeight: '700' },
    name: { flex: 1, fontSize: 18 },
    score: { fontSize: 18, fontWeight: '600' },
});

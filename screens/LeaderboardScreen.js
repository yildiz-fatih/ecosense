import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function LeaderboardScreen() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('total', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsub;
    }, []);

    const renderItem = ({ item, index }) => {
        const rank = index + 1;
        const isEven = index % 2 === 0;
        let iconName, iconColor;
        if (rank === 1) {
            iconName = 'medal-outline'; iconColor = '#FFD700';
        } else if (rank === 2) {
            iconName = 'ribbon-outline'; iconColor = '#C0C0C0';
        } else if (rank === 3) {
            iconName = 'trophy-outline'; iconColor = '#CD7F32';
        }

        return (
            <View style={[styles.card, isEven ? styles.evenCard : styles.oddCard]}>
                <View style={styles.rankContainer}>
                    {iconName ? (
                        <Ionicons name={iconName} size={24} color={iconColor} />
                    ) : (
                        <Text style={styles.rankText}>{rank}</Text>
                    )}
                </View>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.score}>{item.total} items</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏆 Leaderboard</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 24,
        marginBottom: 48,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 24,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    evenCard: {
        backgroundColor: '#f9f9f9',
    },
    oddCard: {
        backgroundColor: '#e3f2fd',
    },
    rankContainer: {
        width: 32,
        alignItems: 'center',
        marginRight: 12,
    },
    rankText: {
        fontSize: 16,
        fontWeight: '700',
    },
    username: {
        flex: 1,
        fontSize: 18,
    },
    score: {
        fontSize: 18,
        fontWeight: '600',
    },
});

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { CATEGORIES, useAuth } from '../context/AuthProvider';

const ICONS = {
    plastic: 'water-outline',
    glass: 'beer-outline',
    paper: 'newspaper-outline',
    metal: 'hardware-chip-outline',
    organic: 'leaf-outline',
};

export default function ProfileScreen() {
    const { user } = useAuth();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Ionicons
                name={ICONS[item]}
                size={30}
                color="#2e7d32"
                style={{ marginBottom: 6 }}
            />
            <Text style={styles.catText}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
            <Text style={styles.countText}>{user.counts?.[item] ?? 0}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.title}>{user?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <View style={styles.statsWrap}>
                <Text style={styles.sectionTitle}>My Recycling Stats</Text>

                {/* Total bar */}
                <View style={styles.totalBar}>
                    <Ionicons
                        name="stats-chart-outline"
                        size={32}
                        color="#388e3c"
                        style={{ marginRight: 12 }}
                    />
                    <View>
                        <Text style={styles.catText}>Total</Text>
                        <Text style={styles.countText}>{user.total}</Text>
                    </View>
                </View>

                {/* Per-material grid */}
                <FlatList
                    data={CATEGORIES}
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => signOut(auth)}>
                <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const CARD_BG = '#F9FFF7';
const BG = '#fff';

const styles = StyleSheet.create({
    scroll: { padding: 24, alignItems: 'center', backgroundColor: BG },

    title: { fontSize: 28, fontWeight: '700', marginTop: 24 },
    email: { fontSize: 16, color: '#555', marginBottom: 24 },

    statsWrap: { width: '100%' },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },

    /* total */
    totalBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFFFF',
        borderRadius: 16,
        height: 90,
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    /* per-category cards */
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 16,
        aspectRatio: 1,
        width: '45%',
        margin: '1.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catText: { fontSize: 14, color: '#333' },
    countText: { fontSize: 20, fontWeight: '700', marginTop: 2 },

    btn: {
        marginTop: 24,
        padding: 12,
        backgroundColor: '#FF5B61',
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    btnText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

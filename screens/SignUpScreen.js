import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { CATEGORIES } from '../context/AuthProvider';

export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSignUp = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const counts = Object.fromEntries(CATEGORIES.map(c => [c, 0]));
            await setDoc(doc(db, 'users', user.uid), {
                username, email: email.trim(), counts, total: 0,
            });
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input} placeholder="Username"
                value={username} onChangeText={setUsername}
            />
            <TextInput
                style={styles.input} placeholder="Email"
                keyboardType="email-address" autoCapitalize="none"
                value={email} onChangeText={setEmail}
            />
            <TextInput
                style={styles.input} placeholder="Password"
                secureTextEntry value={password} onChangeText={setPassword}
            />
            {error ? <Text style={styles.err}>{error}</Text> : null}

            <TouchableOpacity style={styles.btn} onPress={onSignUp}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
    btn: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginBottom: 12 },
    btnText: { color: '#fff', textAlign: 'center', fontSize: 16 },
    err: { color: 'red', marginBottom: 8 },
    link: { color: '#0066cc', textAlign: 'center' },
});

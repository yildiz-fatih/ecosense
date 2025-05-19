import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <View style={styles.container}>
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

            <TouchableOpacity style={styles.btn} onPress={onLogin}>
                <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>No account? Sign up</Text>
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

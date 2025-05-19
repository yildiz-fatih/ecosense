import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.header}>Log in</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#2e7d32" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color="#2e7d32" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.btn} onPress={onLogin}>
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}>Don’t have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2e7d32',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fafafa',
    },
    icon: {
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#2e7d32',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    link: {
        textAlign: 'center',
        color: '#388e3c',
        fontSize: 14,
    },
    error: {
        color: '#d32f2f',
        marginBottom: 12,
        textAlign: 'center',
    },
});

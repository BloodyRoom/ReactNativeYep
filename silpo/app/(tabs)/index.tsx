import { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            alert('Заповни всі поля');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://3.75.222.161/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { message: text };
            }

            if (!response.ok) {
                alert(data.message || 'Помилка реєстрації');
                return;
            }

            alert('Успішна реєстрація');
        } catch (e) {
            console.error(e);
            alert('Помилка з’єднання з сервером');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Реєстрація</ThemedText>

            <TextInput
                placeholder="Ім'я"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                placeholder="Прізвище"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Пароль"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={{
                    ...styles.button,
                    backgroundColor: loading ? '#b8b8b8' : '#4CAF50',
                }}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <ThemedText style={styles.buttonText}>Зареєструватись</ThemedText>
                )}
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
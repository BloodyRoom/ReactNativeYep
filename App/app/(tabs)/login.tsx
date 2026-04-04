// app/login.tsx
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Fonts } from '../../constants/theme'; // підключаємо твій файл

export default function LoginScreen() {
    const colorScheme = useColorScheme(); // 'light' або 'dark'
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text, fontFamily: Fonts.sans }]}>
                Логін
            </Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.background === '#fff' ? '#f5f5f5' : '#1E1E1E',
                        borderColor: theme.icon,
                        color: theme.text,
                        fontFamily: Fonts.sans,
                    },
                ]}
                placeholder="Email"
                placeholderTextColor={theme.icon}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.background === '#fff' ? '#f5f5f5' : '#1E1E1E',
                        borderColor: theme.icon,
                        color: theme.text,
                        fontFamily: Fonts.sans,
                    },
                ]}
                placeholder="Пароль"
                placeholderTextColor={theme.icon}
                secureTextEntry
            />

            <Pressable
                style={[styles.button, { backgroundColor: theme.tint }]}
            >
                <Text style={[styles.buttonText, { color: theme.background === '#fff' ? '#fff' : '#151718', fontFamily: Fonts.sans }]}>
                    Увійти
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
});
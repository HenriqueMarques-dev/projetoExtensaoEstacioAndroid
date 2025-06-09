import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useUsers } from "@/hooks/useUsers";
import { saveUser } from "@/utils/storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";



export default function Register() {
    const [username, SetUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [focused, setFocused] = useState<'email' | 'password' | 'username' | null>(null);

    const { createUser } = useUsers();

    async function handleClick() {
        console.log('Register data:', { username, email, password });
        await createUser({
            username,
            email,
            password
        })
            .then(async (response) => {
                console.log('Login successful:', email);
                await saveUser(email)
                router.push(
                    {
                        pathname: '/home',
                        params: {
                            email: String(email),
                        }
                    }
                )
            }
            ).catch((error) => {
                Alert.alert(
                    'Erro ao fazer login',
                    error.message,
                    [{ text: 'OK' }]
                );
            }
            );
    }

    return (
        <View >
            <Text style={styles.primaryText}>Crie sua conta com um clique!</Text>
            <View style={styles.inputView}>
                <Input
                    placeholder="Nome"
                    value={username}
                    onChangeText={(text) => SetUserName(text)}
                    onFocus={() => setFocused('username')}
                    onBlur={() => setFocused(null)}
                    isFocused={focused === 'username'}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    isFocused={focused === 'email'}
                />
                <Input
                    placeholder="Senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    isFocused={focused === 'password'}
                    secureTextEntry
                />
                <Button title="Criar Conta" style={{ marginTop: 20 }} onPress={handleClick} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    primaryText: {
        textAlign: 'left',
        padding: 15,
        paddingHorizontal: 30,
        width: '90%',
        color: '#2e2222',
        fontSize: 20,
        fontWeight: '700'
    },
    inputView: {
        gap: 10,
        width: '100%',
        alignItems: 'center'
    },
})
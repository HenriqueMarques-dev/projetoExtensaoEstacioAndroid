import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useUsers } from "@/hooks/useUsers";
import { saveUser } from "@/utils/storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";



export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [focused, setFocused] = useState<'email' | 'password' | null>(null);

    const { login } = useUsers();

    async function handleClick() {
        await login(email, password)
            .then(async (response) => {
                console.log('Login successful:', response.user.email);
                await saveUser(response.user.email)
                router.push(
                    {
                        pathname: '/home',
                        params: {
                            email: String(response.user.email),
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
            <Text style={styles.primaryText}>Acesse sua conta</Text>
            <View style={styles.inputView}>
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

                <Button title="Entrar" style={{ marginTop: 20 }} onPress={handleClick} />

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
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useSells from "@/hooks/useSells";
import { IUser, useUsers } from "@/hooks/useUsers";
import { getUserEmail, removeUser } from "@/utils/storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function HomeScreen() {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isFocused, setIsFocused] =
        useState<'product' | 'price' | 'quantity' | null>(null);
    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const { getUser } = useUsers();
    const { createSell } = useSells();
    const { email } = useLocalSearchParams();



    useEffect(() => {
        async function fetch() {
            const getEmail = await getUserEmail('userEmail')
            if (!getEmail) {
                console.warn('[Home]: Usuário não encontrado.');
                router.push('/');
                return;
            }
            const response = await getUser(getEmail);
            setUser(response);
        }
        fetch();
    }, [email]);

    async function logout() {
        await removeUser('userEmail')
        console.log('[Logout] usuário removido')
        router.replace('/');

    }

    function clearFields() {
        setProduct('');
        setPrice('');
        setQuantity('');
    }



    async function handleCreateSell() {
        if (!product || !price || !quantity) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
            return;
        }

        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity, 10);

        if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            Alert.alert('Valores inválidos', 'Preencha os campos corretamente.');
            return;
        }

        await createSell({
            userId: String(user.id),
            product,
            price: parsedPrice,
            quantity: parsedQuantity,
        });

        clearFields();

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Venda registrada', 'Sua venda foi adicionada com sucesso.');


    }

    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                <Image source={require('../../../../assets/images/mascAvatar.png')} style={styles.avatar} />
                <View style={styles.infoView}>
                    <Text style={styles.title}>{user.username}</Text>
                    <Text style={styles.subtitle}>{user.email}</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <FontAwesome name="sign-out" size={28} color={'red'} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, { padding: 15 }]}>Cadastrar Nova Venda</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputView}>
                <Input
                    placeholder="Título da Venda"
                    onFocus={() => setIsFocused('product')}
                    onChangeText={(text) => setProduct(text)}
                    value={product}
                    isFocused={isFocused === 'product'}
                />
                <Input
                    placeholder="Preço do Produto"
                    onFocus={() => setIsFocused('price')}
                    onChangeText={(text) => setPrice(text)}
                    value={String(price)}
                    isFocused={isFocused === 'price'}
                />
                <Input
                    placeholder="Quantidade Vendida"
                    onFocus={() => setIsFocused('quantity')}
                    onChangeText={(text) => setQuantity(text)}
                    value={String(quantity)}
                    isFocused={isFocused === 'quantity'}
                />
                <View style={styles.buttonsView}>
                    <Button
                        type="secondary"
                        title="Limpar Campos"
                        style={{ flex: 1 }}
                        onPress={clearFields}

                    />
                    <Button
                        title="Cadastrar Venda"
                        style={{ flex: 1 }}
                        onPress={handleCreateSell}
                    />
                </View>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 0
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 120,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    infoView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    inputView: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 10,
        gap: 10,
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        gap: 10,
        marginTop: 10,
    }
});
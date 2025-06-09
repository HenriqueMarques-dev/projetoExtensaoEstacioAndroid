/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/Input";
import SellItem from "@/components/SellItem";
import useSells, { ISell } from "@/hooks/useSells";
import { useUsers } from "@/hooks/useUsers";
import { getUserEmail } from "@/utils/storage";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";


export default function Sells() {
    const [search, setSearch] = useState<string>('');
    const [sells, setSells] = useState<ISell[]>([]);
    const { searchByName } = useSells();
    const { getUser } = useUsers();

    useFocusEffect(
        useCallback(() => {
            listSells();
        }, [search])
    );

    async function listSells() {
        const getEmail = await getUserEmail('userEmail')

        if (!getEmail) {
            return
        }

        const user = await getUser(getEmail);
        const sells = await searchByName(search, user.id);
        setSells(sells);
    }


    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <FontAwesome size={28} name="search" color="#0b7dff" style={{ position: 'absolute', right: 20, top: '40%', zIndex: 10 }} />
                <Input
                    placeholder="Buscar por nome do produto"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    autoCapitalize="none"
                    style={{ flex: 1, position: 'relative' }}
                />
            </View>
            <View style={styles.sellsView}>
                <Text style={styles.title}>Minhas Vendas</Text>
                <FlatList
                    data={sells}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SellItem
                            createdAt={item.createdAt}
                            product={item.product}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 32 }}
                />
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchView: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 40 : 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10
    },
    sellsView: {
        width: '80%',
    }
});

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function TabLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Tabs screenOptions={{ tabBarActiveTintColor: '#0b7dff', headerShown: false }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="sells"
                    options={{
                        title: 'Minhas Vendas',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="calculator" color={color} />,
                    }}
                />
            </Tabs>
        </>
    );
}
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IButtonProps extends TouchableOpacityProps {
    type?: 'primary' | 'secondary';
    title: string;
}
export function Button({ type = 'primary', title, ...props }: IButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            style={[styles[type], props.style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    primary: {
        padding: 10,
        backgroundColor: '#2b85e6',
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    secondary: {
        padding: 10,
        backgroundColor: '#ff0000',
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
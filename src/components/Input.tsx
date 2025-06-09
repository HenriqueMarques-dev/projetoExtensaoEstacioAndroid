import { Keyboard, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface IInputProps extends TextInputProps {
    isFocused?: boolean;
}

export function Input({ isFocused = false, ...props }: IInputProps) {
    return (
        <TextInput
            {...props}
            enablesReturnKeyAutomatically
            placeholderTextColor={'#999'}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            style={[style.input, isFocused && { borderColor: '#2b85e6' }, props.style]}
        />
    )
}



const style = StyleSheet.create({
    input: {
        padding: 20,
        height: 60,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        shadowColor: '#000',
    }
});

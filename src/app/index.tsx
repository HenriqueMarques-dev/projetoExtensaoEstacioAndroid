import Login from "@/screens/Login";
import Register from "@/screens/Register";
import { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";


export default function Index() {
  const [screen, setScreen] = useState<'login' | 'register'>('login');



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo.png')}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View >
          {screen === 'login' ? (
            <Login />
          ) : (
            <Register />
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.linkView}>
        <Pressable onPress={() => setScreen(screen === 'login' ? 'register' : 'login')}>
          <Text style={styles.link}>
            {screen === 'login' ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  link: {
    color: '#1a6cf1',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  linkView: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',

  }
});

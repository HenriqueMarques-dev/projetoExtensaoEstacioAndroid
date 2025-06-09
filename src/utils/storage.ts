import AsyncStorage from '@react-native-async-storage/async-storage'

async function saveUser(email: string) {
    return await AsyncStorage.setItem('userEmail', email)
}

async function removeUser(key: string) {
    return await AsyncStorage.removeItem(key)
}

async function getUserEmail(key: string) {
    return await AsyncStorage.getItem(key)
}


export { getUserEmail, removeUser, saveUser }


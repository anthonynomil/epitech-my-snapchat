import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataJSON = async (key, data) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const storeData = async (key, data) => {
    await AsyncStorage.setItem(key, data);
}

export const getDataJSON = async (key) => {
    return JSON.parse(await AsyncStorage.getItem(key));
}

export const getData = async (key) => {
    return await AsyncStorage.getItem(key);
}

export const removeData = async (key) => {
    await AsyncStorage.removeItem(key);
}

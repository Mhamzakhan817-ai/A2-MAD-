import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveToStorage = async (key, value) => {
try {
const jsonValue = JSON.stringify(value);
await AsyncStorage.setItem(key, jsonValue);
} catch (e) {
console.log("Storage save error:", e);
}
};


export const getFromStorage = async (key) => {
try {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
} catch (e) {
console.log("Storage read error:", e);
return null;
}
};


export const removeFromStorage = async (key) => {
try {
await AsyncStorage.removeItem(key);
} catch (e) {
console.log("Storage delete error:", e);
}
};
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (
  key: string,
  value: number | string | boolean,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving to Async storage');
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error retrieveing from Async Storage');
  }
};

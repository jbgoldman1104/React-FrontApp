import AsyncStorage from '@react-native-community/async-storage';

export default {
  setItem: async (key:string, value: any) => {
    try {
      if ( !value ) {
        await AsyncStorage.removeItem(key);  
      }
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  },
  getItem: async (key:string) => {
    try {
      const item = await AsyncStorage.getItem(key);

      if ( item) {
        return JSON.parse(item);
      } 
      return null;
    } catch (error) {}
  },
  removeItem: async (key:string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  },
  updateItem: async (key:string, value: any) => {
    try {
      const item = await AsyncStorage.getItem(key);
      if ( !item) {
        return null;
      }
      const result = {...JSON.parse(item), ...value};

      await AsyncStorage.setItem(key, JSON.stringify(result));
    } catch (error) {}
  },
};
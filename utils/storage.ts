// import AsyncStorage from '@react-native-community/async-storage';

// export default {
//   setItem: async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {}
//   },
//   getItem: async (key) => {
//     try {
//       const item = await AsyncStorage.getItem(key);

//       return JSON.parse(item);
//     } catch (error) {}
//   },
//   removeItem: async (key) => {
//     try {
//       await AsyncStorage.removeItem(key);
//     } catch (error) {}
//   },
//   updateItem: async (key, value) => {
//     try {
//       const item = await AsyncStorage.getItem(key);
//       const result = {...JSON.parse(item), ...value};

//       await AsyncStorage.setItem(key, JSON.stringify(result));
//     } catch (error) {}
//   },
// };
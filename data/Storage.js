import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Couldn't save data. Error: ${data}`);
    // saving error
  }
}

const load = async (key) => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    console.log("keys :");
    console.info(keys);
    if (!(keys.includes(key))) {
      console.info("Initializing kanjis...");
      clearSave(true);
      console.info("Initialization success.");
    }

    const jsonValue = await AsyncStorage.getItem(key);
    console.debug("Load > Value: ");
    console.debug(jsonValue);
    console.debug(typeof (jsonValue))

    return (jsonValue !== null) ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Couldn't load data. Error: ${data}`);
    // error reading value
  }
}

export default { save, load };

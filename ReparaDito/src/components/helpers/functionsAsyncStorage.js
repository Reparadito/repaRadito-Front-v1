import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItemAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`key "${key}" y value "${value}" guardados en AsyncStorage.`);
  } catch (error) {
    console.error("Error al guardar el par key-value en AsyncStorage:", error);
  }
};

export const loadItemAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("value de loadITemAsyncStorage--->", value);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error al obtener el value desde AsyncStorage:", error);
    return null;
  }
};


export const removeItemAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("usuario eliminado")
  } catch (error) {
    console.error('Error al eliminar de AsyncStorage:', error);
  }
};


export const showAsyncStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    items.forEach(([key, value]) => {
      console.log('Contenido de AsyncStorage:--->', key, value);
    });
  } catch (error) {
    console.error('Error al obtener datos de AsyncStorage:', error);
  }
};


export const updateAsyncStorage = async (key, newData) => {
  try {
    // Obtén los datos existentes del AsyncStorage
    const storedData = await AsyncStorage.getItem(key);
    if (storedData !== null) {
      const parsedData = JSON.parse(storedData);
      const updatedData = { ...parsedData };

      const changedFields = [];
      for (const field in newData) {
        if (newData[field] !== updatedData[field]) {
          updatedData[field] = newData[field];
          changedFields.push(field);
        }
      }

      // Actualiza solo los valores que han cambiado
      if (changedFields.length > 0) {
        await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      }

      const result = {
        createdAt: updatedData.createdAt,
        date: updatedData.date,
        deleted: updatedData.deleted,
        email: updatedData.email,
        fullname: updatedData.fullname,
        id: updatedData.id,
        image: updatedData.image,
        newsLetter: updatedData.newsLetter,
        password: updatedData.password,
        phone: updatedData.phone,
        tac: updatedData.tac,
        token: updatedData.token,
        updatedAt: updatedData.updatedAt,
        user: updatedData.user,
        userAdmin: updatedData.userAdmin
      };

      return result;
    }
  } catch (error) {
    console.error("Error updating AsyncStorage:", error);

    const result = {
      error: error.message || "Unknown error"
    };

    return result;
  }
};
// Llama a la función para mostrar los datos cuando sea necesario, por ejemplo, en un evento o en un botón

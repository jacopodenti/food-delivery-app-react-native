import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user) => {
  try {
    const { sid, uid } = user;
    if (sid != undefined && sid != null) {
      await AsyncStorage.setItem("sid", sid.toString());
    }
    if (uid != undefined && uid != null) {
      await AsyncStorage.setItem("uid", uid.toString());
    }
    console.log("Utente salvato con: ", sid, uid);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    const sid = await AsyncStorage.getItem("sid");
    const uid = await AsyncStorage.getItem("uid");
    if (sid && uid) {
      return { sid, uid };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//funzione per salvare i menù preferiti
export const saveFavorite = async (name) => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = favorites ? JSON.parse(favorites) : [];
    if (!favoritesArray.includes(name)) {
      favoritesArray.push(name);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      console.log("Menù aggiunto ai preferiti: ", name);
    } else {
      console.log("Menù già presente nei preferiti: ", name);
    }
  } catch (error) {
    console.error("Errore nel salvataggio del menù:", error);
  }
};

//funzione per recuperare i menù preferiti
export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Errore nel recupero dei menù preferiti:", error);
    return [];
  }
};

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchMenuIngredients = async (mid) => {
  try {
    const sid = await AsyncStorage.getItem("sid");
    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}/ingredients?sid=${sid}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del menu", error);
    throw error;
  }
};

export default fetchMenuIngredients;

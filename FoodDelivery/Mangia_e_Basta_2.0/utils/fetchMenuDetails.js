import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchMenuDetails = async (mid, lat, lon) => {
  try {
    const sid = await AsyncStorage.getItem("sid");
    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}?lat=${lat}&lng=${lon}&sid=${sid}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli del menu", error);
  }
};

export default fetchMenuDetails;

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchOrderDetails = async (oid) => {
  try {
    const sid = await AsyncStorage.getItem("sid");

    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/order/${oid}?sid=${sid}`
    );
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dettagli dell'ordine", error);
    throw error;
  }
};

export default fetchOrderDetails;

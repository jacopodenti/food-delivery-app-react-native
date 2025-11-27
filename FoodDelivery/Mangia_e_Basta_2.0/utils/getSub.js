import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const getSub = async (uid) => {
  try {
    const sid = await AsyncStorage.getItem("sid");

    const response = await axios.put(
      `https://develop.ewlab.di.unimi.it/mc/2425/user/Febbraio1/${uid}/subscription/enable`,
      {
        sid: sid,
      }
    );

    const data = response.data;
    Alert.alert("Acquisto effettuato", "Hai acquistato l'abbonamento mangione");
    console.log(
      "Esame febbraio: acquisto abbonamento mangione andato a buon fine"
    );
    return data;
  } catch (error) {
    console.error(
      "Esame febbraio: acquisto abbonamento mangione non andato a buon fine"
    );
    Alert.alert(
      "Errore",
      "Si è verificato un errore nell'acquisto dell'abbonamento"
    );
  }
};

export default getSub;

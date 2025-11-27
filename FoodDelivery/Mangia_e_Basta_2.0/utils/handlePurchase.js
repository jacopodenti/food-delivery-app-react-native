import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const handlePurchase = async (mid, lat, lon) => {
  try {
    const sid = await AsyncStorage.getItem("sid");
    const profile = JSON.parse((await AsyncStorage.getItem("profile")) || "{}");

    const response = await axios.post(
      `https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}/buy`,
      {
        sid: sid,
        deliveryLocation: {
          lat: lat,
          lng: lon,
        },
        paymentDetails: {
          creditCardNumber: String(profile.creditCardNumber),
          expirationMonth: String(profile.expirationMonth),
          expirationYear: String(profile.expirationYear),
          cvv: String(profile.cardCVV),
        },
      }
    );

    const data = response.data;
    await AsyncStorage.setItem("lastOid", data.oid.toString()); //salvo l'oid nell'AsyncStorage
    Alert.alert(
      "Acquisto effettuato",
      "Il tuo ordine è stato registrato correttamente"
    );
    return data;
  } catch (error) {
    console.error("Errore nell'acquisto", error);
    Alert.alert("Errore", "Si è verificato un errore nell'acquisto");
  }
};

export default handlePurchase;

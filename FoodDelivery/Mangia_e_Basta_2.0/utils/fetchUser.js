import axios from "axios";
import { getUser } from "../lib/storage";

export const fetchUser = async (uid) => {
  const user = await getUser("user"); //user
  const sid = user.sid;

  try {
    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/user/Febbraio1/${uid}?sid=${sid}`
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

//Restituisce tutte le informazioni di un utente assieme al suo ultimo ordine effettuato.

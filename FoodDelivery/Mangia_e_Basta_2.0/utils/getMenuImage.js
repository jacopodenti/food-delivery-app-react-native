import axios from "axios";
import { getUser } from "../lib/storage";

export const getMenuImage = async (mid) => {
  try {
    const user = await getUser();
    sid = user.sid;
  } catch (error) {
    console.error("Errore getMenuImage", error);
  }
  try {
    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/menu/${mid}/image?sid=${sid}`
    );
    if (response.status === 200 && response.data.base64) {
      return response.data.base64;
    } else {
      console.error("Immagine non disponibile");
    }
  } catch (error) {
    console.error("Errore nel recupero dell'immagine del menu", error);
  }
};

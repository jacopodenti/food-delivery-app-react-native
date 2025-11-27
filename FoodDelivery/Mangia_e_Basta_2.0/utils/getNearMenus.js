import { getUser } from "../lib/storage";
import axios from "axios";

const getNearMenus = async (latitude, longitude) => {
  let sid;
  try {
    const user = await getUser();
    sid = user.sid;
  } catch (error) {
    console.error("Errore nel recupero dell'utente", error);
  }
  try {
    const response = await axios.get(
      `https://develop.ewlab.di.unimi.it/mc/2425/menu/Febbraio1?lat=${latitude}&lng=${longitude}&sid=${sid}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export default getNearMenus;

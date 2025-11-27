import axios from "axios";
import { saveUser } from "../lib/storage";

const createUser = async () => {
  try {
    const response = await axios.post(
      `https://develop.ewlab.di.unimi.it/mc/2425/user`
    );
    console.log("Utente creato con: ", response.data);
    await saveUser(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export default createUser;

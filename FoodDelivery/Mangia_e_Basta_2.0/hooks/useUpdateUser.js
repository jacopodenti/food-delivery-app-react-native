import { useMutation } from "@tanstack/react-query";
import updateUser from "../utils/updateUser";

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (profileData) => updateUser(profileData),
    onSuccess: (data) => {
      console.log("Profilo aggiornato con successo:", data);
    },
    onError: (error) => {
      console.error("Errore durante l'aggiornamento del profilo:", error);
    },
  });
};

export default useUpdateUser;

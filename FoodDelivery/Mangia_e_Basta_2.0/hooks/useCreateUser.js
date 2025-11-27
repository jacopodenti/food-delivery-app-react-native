import { useQuery } from "@tanstack/react-query";
import createUser from "../utils/createUser";

export const useCreateUser = (user) => {
  return useQuery({
    queryKey: ["useCreateUser"],
    queryFn: () => createUser(),
    enabled: user,
  });
};

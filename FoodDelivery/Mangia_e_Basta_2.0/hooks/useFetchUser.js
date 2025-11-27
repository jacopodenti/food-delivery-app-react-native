import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../utils/fetchUser";

export const useFetchUser = (uid) => {
  return useQuery({
    queryKey: ["fetchUser", uid],
    queryFn: () => fetchUser(uid),
    enabled: !!uid,
  });
};

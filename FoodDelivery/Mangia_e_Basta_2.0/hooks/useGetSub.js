import getSub from "../utils/getSub";
import { useQuery } from "@tanstack/react-query";

const useGetSub = (uid) => {
  const query = useQuery({
    queryKey: ["useGetSub", uid],
    queryFn: () => getSub(uid),
    enabled: false,
  });
  return query;
};

export default useGetSub;

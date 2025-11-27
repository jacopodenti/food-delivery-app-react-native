import { useQuery } from "@tanstack/react-query";
import getNearMenus from "../utils/getNearMenus";

export const useGetNearMenus = (latitude, longitude) => {
  const query = useQuery({
    queryKey: ["useGetNearMenus", latitude, longitude],
    queryFn: () => getNearMenus(latitude, longitude),
  });
  return query;
};

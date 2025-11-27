import { useQuery } from "@tanstack/react-query";
import fetchMenuIngredients from "../utils/fetchMenuIngredients";

export const useFetchMenuIngredients = (mid) => {
  const query = useQuery({
    queryKey: ["useFetchMenuIngredients", mid],
    queryFn: () => fetchMenuIngredients(mid),
    enabled: !!mid,
  });

  return query;
};

import { useQuery } from "@tanstack/react-query";
import fetchOrderDetails from "../utils/fetchOrderDetails";

export const useFetchOrderDetails = (oid) => {
  const query = useQuery({
    queryKey: ["useFetchOrderDetails", oid],
    queryFn: () => fetchOrderDetails(oid),
    enabled: !!oid,
  });

  return query;
};

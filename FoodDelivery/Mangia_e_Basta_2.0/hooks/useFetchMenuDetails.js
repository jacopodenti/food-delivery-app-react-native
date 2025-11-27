import { useQuery } from "@tanstack/react-query";
import fetchMenuDetails from "../utils/fetchMenuDetails";

const useFetchMenuDetails = (mid, lat, lon) => {
  return useQuery({
    queryKey: ["useFetchMenuDetails", mid, lat, lon],
    queryFn: () => fetchMenuDetails(mid, lat, lon),
    enabled: Boolean(mid && lat !== null && lon !== null),
  });
};

export default useFetchMenuDetails;

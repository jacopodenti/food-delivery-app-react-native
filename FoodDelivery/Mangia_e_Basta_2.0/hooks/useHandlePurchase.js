import handlePurchase from "../utils/handlePurchase";
import { useQuery } from "@tanstack/react-query";

const useHandlePurchase = (mid, lat, lon) => {
  const query = useQuery({
    queryKey: ["useHandlePurchase", mid, lat, lon],
    queryFn: () => handlePurchase(mid, lat, lon),
    enabled: false,
  });
  return query;
};

export default useHandlePurchase;

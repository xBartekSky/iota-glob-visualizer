import { useQuery } from "@tanstack/react-query";
import { fetchIotaValidators } from "../services/ValidatorService";

export const useValidators = () => {
  return useQuery({
    queryKey: ["iotaValidators"],
    queryFn: fetchIotaValidators,
    refetchInterval: 20000,
    staleTime: 15000,
  });
};

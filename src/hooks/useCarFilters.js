import { useQuery } from "@tanstack/react-query";
import { fetchFilterAPI } from "../services/carService";

export const useCarFilters = () => {
  return useQuery({
    queryKey: ["carFilters"],
    queryFn: async () => {
      const result = await fetchFilterAPI();
      return result.data; // Unwrap the 'data' property
    },
    staleTime: 1000 * 60 * 60, // 1 Hour Cache (Brands don't change often)
    refetchOnWindowFocus: false,
  });
};

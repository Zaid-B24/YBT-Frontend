import { useQuery } from "@tanstack/react-query";
import { fetchBikeFilterAPI } from "../services/BikeService";

export const useBikeFilters = () => {
  return useQuery({
    queryKey: ["bikeFilters"],
    queryFn: async () => {
      const result = await fetchBikeFilterAPI();
      return result.data; // Unwrap the 'data' property
    },
    staleTime: 1000 * 60 * 60, // 1 Hour Cache (Brands don't change often)
    refetchOnWindowFocus: false,
  });
};

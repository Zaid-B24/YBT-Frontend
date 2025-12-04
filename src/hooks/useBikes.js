import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchBikesAPI, searchBikesAPI } from "../services/BikeService";

export const useBikes = (filters = {}, options = {}) => {
  const queryKey = ["bikes", filters];

  const queryFn = ({ pageParam }) => {
    const allParams = {
      ...filters,
      cursor: pageParam,
    };
    if (filters.q && filters.q.trim() !== "") {
      return searchBikesAPI(allParams);
    } else {
      return fetchBikesAPI(allParams);
    }
  };

  const transformBikeData = (bike) => ({
    id: bike.id,
    title: bike.title,
    brand: bike.brand,
    year: bike.registrationYear ? bike.registrationYear.toString() : "",
    price: bike.ybtPrice,
    image: bike.thumbnail,
    badges: [...(bike.badges || []), bike.tuningStage].filter(Boolean),
    specs: bike.specs || [],
  });

  // ✅ Always call useInfiniteQuery unconditionally.
  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn,
    // The logic is now INSIDE the options, which is allowed.
    getNextPageParam: (lastPage) => {
      // If useInfinite is true, use the real cursor.
      if (options.useInfinite) {
        return lastPage.pagination?.nextCursor ?? undefined;
      }
      // Otherwise, always return undefined to prevent fetching more pages.
      return undefined;
    },
  });

  // This data transformation logic remains the same and works perfectly.
  const bikes = useMemo(() => {
    if (!queryResult.data) return [];
    // The data structure from useInfiniteQuery is always `data.pages`
    return queryResult.data.pages.flatMap((page) =>
      page.data.map(transformBikeData)
    );
  }, [queryResult.data]);

  // For non-infinite queries, isLoading is more intuitive than isFetching
  const isLoading = queryResult.isFetching && !queryResult.isFetchingNextPage;

  return { ...queryResult, bikes, isLoading };
};

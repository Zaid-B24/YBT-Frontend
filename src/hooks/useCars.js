import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchCarsAPI } from "../services/carService";

export const useCars = (collectionType, filters = {}, options = {}) => {
  const queryKey = ["cars", collectionType, filters];

  const queryFn = ({ pageParam }) => {
    const allParams = {
      collectionType,
      ...filters,
      cursor: pageParam,
    };
    return fetchCarsAPI(allParams);
  };

  const transformCarData = (car) => ({
    id: car.id,
    title: car.title,
    brand: car.brand,
    year: new Date(car.createdAt).getFullYear().toString(),
    price: car.ybtPrice,
    image: car.thumbnail,
    badges: [...(car.badges || []), car.tuningStage].filter(Boolean),
    specs: car.specs || [],
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
    enabled: !!collectionType,
  });

  // This data transformation logic remains the same and works perfectly.
  const cars = useMemo(() => {
    if (!queryResult.data) return [];
    // The data structure from useInfiniteQuery is always `data.pages`
    return queryResult.data.pages.flatMap((page) =>
      page.data.map(transformCarData)
    );
  }, [queryResult.data]);

  // For non-infinite queries, isLoading is more intuitive than isFetching
  const isLoading = queryResult.isFetching && !queryResult.isFetchingNextPage;

  return { ...queryResult, cars, isLoading };
};

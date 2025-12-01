import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEventsAPI } from "../services/eventService";

export const useEvents = (activeFilter) => {
  return useInfiniteQuery({
    queryKey: ["events", activeFilter],
    queryFn: ({ pageParam }) =>
      fetchEventsAPI({ pageParam, filter: activeFilter }),

    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 Minutes
  });
};

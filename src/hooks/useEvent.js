import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchEventsAPI } from "../services/eventService";

export const useEvents = (activeFilter) => {
  const queryKey = ["events", activeFilter];
  const transformEvent = (event) => {
    const dateStr = new Date(event.startDate).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const minPrice = event.ticketTypes?.[0]?.price;
    const priceLabel = minPrice
      ? `₹ ${minPrice.toLocaleString()} onwards`
      : "Free / TBD";

    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      description: event.description,
      thumbnail: event.thumbnail,
      mobileThumbnail: event.mobileThumbnail,
      type: event.type,
      status: event.status,
      date: dateStr,
      price: priceLabel,
    };
  };

  const queryResult = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchEventsAPI({ pageParam, filter: activeFilter }),

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === true) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
  });

  const events = useMemo(() => {
    if (!queryResult.data) return [];
    return queryResult.data.pages.flatMap((page) =>
      page.data.map(transformEvent)
    );
  }, [queryResult.data]);

  const isLoading = queryResult.isFetching && !queryResult.isFetchingNextPage;

  return { ...queryResult, events, isLoading };
};

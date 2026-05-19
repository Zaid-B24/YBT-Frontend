import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
//import { fetchEventsAPI } from "../services/eventService";
import { getPublicEvents } from "../api/Events/Event.api";

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

export const useEvents = (activeFilter) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["events", activeFilter],
    queryFn: ({ pageParam }) =>
      getPublicEvents({ pageParam, filter: activeFilter }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,

    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const events = useMemo(() => {
    if (!queryResult.data) return [];

    return queryResult.data.pages.flatMap((page) =>
      (page?.data || []).map(transformEvent),
    );
  }, [queryResult.data]);

  const isLoading = queryResult.isFetching && !queryResult.isFetchingNextPage;

  return { ...queryResult, events, isLoading };
};

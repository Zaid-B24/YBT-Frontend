import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEventCategoriesAPI } from "../services/eventService";

const CACHE_TIME = 1000 * 60 * 60; // 1 hour
const STALE_TIME = 1000 * 60 * 30; // 30 minutes

export const useEventFilters = () => {
  const { data: filterData, isLoading } = useQuery({
    queryKey: ["eventFilters"],
    queryFn: fetchEventCategoriesAPI,
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const filters = useMemo(() => {
    const staticFilters = [
      { key: "upcoming", label: "Upcoming" },
      { key: "past", label: "Past Events" },
    ];

    const dynamicFilters =
      filterData?.data?.categories?.map((cat) => ({
        key: cat.slug,
        label: cat.name,
      })) || [];

    return [...staticFilters, ...dynamicFilters];
  }, [filterData]);

  return { filters, isLoading };
};

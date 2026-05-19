import { useQuery } from "@tanstack/react-query";
import { getEventFilter } from "../../../api/Events/Event.api";
import { useEvents } from "../../../hooks/useEvent"
import { useMemo, useState } from "react";
import { EventsView } from "./EventsView";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { PageWrapper } from "../EventDetails/EventDetailsView";


export const EventsComponent = () => {

  const [activeFilter, setActiveFilter] = useState("upcoming");

  const { data: filterData } = useQuery({
    queryKey: ["eventFilters"],
    queryFn: getEventFilter,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  const {
    events,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEvents(activeFilter);

  

  const filters = useMemo(() => {
    const staticFilters = [
      { key: "upcoming", label: "Upcoming" },
      { key: "past", label: "Past Events" },
    ];
    const categoriesArray =
      filterData?.data?.categories || filterData?.categories || [];

    const dynamicFilters = categoriesArray.map((cat) => ({
      key: cat.slug,
      label: cat.name,
    }));
    return [...staticFilters, ...dynamicFilters];
  }, [filterData]);

  if (isLoading) return <EventCardSkeleton  />;
  if (isError) return <PageWrapper>Error: {error.message}</PageWrapper>;
  if (!events) return <PageWrapper>Event not found.</PageWrapper>;

return (
    <EventsView
      events={events}
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      isLoading={isLoading}
      isError={isError}
      error={error}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
)
}
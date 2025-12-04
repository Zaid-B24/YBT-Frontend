import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";
import {
  fetchAdminEventsAPI,
  updateEventStatusAPI,
  deleteEventAPI,
} from "../services/eventService";

export const useAdminEvents = ({ sortBy, searchTerm }) => {
  const queryClient = useQueryClient();

  const transformEvent = (event) => ({
    ...event, // Keep original data for editing forms
    formattedDate: new Date(event.startDate).toLocaleDateString(),
    displayStatus: event.status.charAt(0) + event.status.slice(1).toLowerCase(),
    // Add any other UI-specific fields here
  });

  // 2. Query (Fetch Data)
  const queryResult = useInfiniteQuery({
    queryKey: ["adminEvents", { sortBy, searchTerm }],

    // logic: React Query passes 'pageParam', we send it as 'cursor'
    queryFn: ({ pageParam }) =>
      fetchAdminEventsAPI({ limit: 9, sortBy, cursor: pageParam }),

    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },

    staleTime: 1000 * 60 * 5, // Good practice to add staleTime
  });

  const events = useMemo(() => {
    if (!queryResult.data) return [];
    // This .pages logic ONLY works with useInfiniteQuery
    return queryResult.data.pages.flatMap((page) =>
      page.data.map(transformEvent)
    );
  }, [queryResult.data]);

  // 3. Mutation: Update Status
  const updateStatusMutation = useMutation({
    mutationFn: updateEventStatusAPI,
    onSuccess: () => {
      toast.success("Event status updated! ✅");
      queryClient.invalidateQueries(["adminEvents"]);
    },
    onError: (err) => toast.error(err.message),
  });

  // 4. Mutation: Delete Event
  const deleteEventMutation = useMutation({
    mutationFn: deleteEventAPI,
    onSuccess: () => {
      toast.success("Event deleted successfully! 🗑️");
      queryClient.invalidateQueries(["adminEvents"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    events,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,

    // 3. EXPOSE THESE FOR THE UI
    fetchNextPage: queryResult.fetchNextPage,
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,

    // Actions
    updateEventStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,

    deleteEvent: deleteEventMutation.mutate,
    isDeleting: deleteEventMutation.isPending,
  };
};

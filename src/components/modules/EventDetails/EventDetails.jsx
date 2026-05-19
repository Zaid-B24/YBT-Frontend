import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug } from "../../../api/Events/Event.api";
import { EventDetailsSkeleton, PageWrapper } from "./EventDetailSkeleton";
import { EventDetailsView } from "./EventDetailsView";

export const EventDetails = () => {
    const { slug } = useParams();
      const { isLoggedIn } = useAuth();

      const {
          data: event,
          isLoading,
          isError,
          error,
        } = useQuery({
          queryKey: ["event", slug],
          queryFn: () => getEventBySlug(slug),
          enabled: !!slug,
        });

        if (isLoading) return <EventDetailsSkeleton />;
        if (isError) return <PageWrapper>Error: {error.message}</PageWrapper>;
        if (!event) return <PageWrapper>Event not found.</PageWrapper>;
    return <EventDetailsView event={event} isLoggedIn={isLoggedIn} />;
}
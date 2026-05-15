import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import {
  EventCard as StyledEventCard,
  EventImageWrapper,
  EventContent,
  EventTitle,
  EventDescription,
  EventPrice,
  EventDateText,
  StatusBadge,
  TypeBadge,
} from "../../styles/EventStyles";

export const EventCard = ({ event, index }) => {
  return (
    <StyledEventCard
      as={Link}
      to={`/events/${event.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <EventImageWrapper>
        <picture>
          {event.mobileThumbnail && (
            <source
              media="(max-width: 768px)"
              srcSet={event.mobileThumbnail}
            />
          )}
          <img
            src={event.thumbnail || "/images/event-placeholder.jpg"}
            alt={event.title}
            loading="lazy"
          />
        </picture>

        <StatusBadge status={event.status}>{event.status}</StatusBadge>
        <TypeBadge type={event.type}>{event.type}</TypeBadge>
      </EventImageWrapper>

      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventDescription>{event.description}</EventDescription>
        <EventPrice>{event.price}</EventPrice>
        <EventDateText>
          <Calendar size={14} /> {event.date}
        </EventDateText>
      </EventContent>
    </StyledEventCard>
  );
};

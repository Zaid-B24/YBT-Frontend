import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.1)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const EventsGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const EventImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const EventDate = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  min-width: 60px;
`;

const EventStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) =>
    props.status === "upcoming"
      ? "rgba(0,255,0,0.8)"
      : props.status === "live"
      ? "rgba(255,0,0,0.8)"
      : "rgba(255,255,255,0.8)"};
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const EventContent = styled.div`
  padding: 2rem;
`;

const EventTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const EventDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #999;
  font-size: 0.9rem;
`;

const LearnMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    gap: 1rem;
  }
`;

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const fetchEvents = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // Data is considered "fresh" for 5 minutes
  });

  const getEventStatus = (startDateStr, endDateStr) => {
    const now = new Date();
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (now > startDate && now < endDate) {
      return "live";
    } else if (now < startDate) {
      return "upcoming";
    } else {
      return "past";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    })
      .format(date)
      .toUpperCase();
  };

  const formatTimeRange = (startDateStr, endDateStr) => {
    const startTime = new Date(startDateStr);
    const endTime = new Date(endDateStr);

    const formatOptionsDate = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    const formatOptionsTime = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const formattedStartDate = new Intl.DateTimeFormat(
      "en-US",
      formatOptionsDate
    ).format(startTime);
    const formattedStartTime = new Intl.DateTimeFormat(
      "en-US",
      formatOptionsTime
    ).format(startTime);
    const formattedEndDate = new Intl.DateTimeFormat(
      "en-US",
      formatOptionsDate
    ).format(endTime);
    const formattedEndTime = new Intl.DateTimeFormat(
      "en-US",
      formatOptionsTime
    ).format(endTime);

    // Check if the event is a single day
    const isSameDay =
      startTime.getDate() === endTime.getDate() &&
      startTime.getMonth() === endTime.getMonth() &&
      startTime.getFullYear() === endTime.getFullYear();

    if (isSameDay) {
      return `${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`;
    } else {
      return `${formattedStartDate}, ${formattedStartTime} - ${formattedEndDate}, ${formattedEndTime}`;
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <p>Loading events...</p>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <p>Error: {error.message}</p>
      </PageWrapper>
    );
  }

  const filters = [
    { key: "all", label: "All Events" },
    { key: "upcoming", label: "Upcoming" },
    { key: "show", label: "Auto Shows" },
    { key: "exclusive", label: "Exclusive" },
    { key: "rally", label: "Rallies" },
    { key: "track", label: "Track Days" },
  ];

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upcoming") return event.status === "upcoming";
    return event.type === activeFilter;
  });

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Events</HeroTitle>
        <HeroSubtitle>
          Experience the world of YOUNG BOY TOYZ through exclusive events,
          shows, and unforgettable automotive experiences.
        </HeroSubtitle>

        <FilterTabs>
          {filters.map((filter) => (
            <FilterTab
              key={filter.key}
              active={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </HeroSection>

      <EventsGrid>
        {filteredEvents.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              minHeight: "30vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#6c757d",
                marginBottom: "16px",
              }}
            >
              We're cooking up something special! 🍳
            </p>
            <p style={{ fontSize: "1rem", color: "#6c757d" }}>
              Check back soon for new events.
            </p>
          </div>
        ) : (
          <GridContainer>
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventImage image={event.primaryImage}>
                  <EventDate>{formatDate(event.startDate)}</EventDate>
                  <EventStatus
                    status={getEventStatus(event.startDate, event.endDate)}
                  >
                    {getEventStatus(event.startDate, event.endDate)}
                  </EventStatus>
                </EventImage>
                <EventContent>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                  <EventDetails>
                    <EventDetail>
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </EventDetail>
                    <EventDetail>
                      <Clock size={16} />
                      <span>
                        {formatTimeRange(event.startDate, event.endDate)}
                      </span>
                    </EventDetail>
                    <EventDetail>
                      <Users size={16} />
                      <span>{event.maxAttendees} attendees</span>
                    </EventDetail>
                  </EventDetails>
                  <LearnMoreButton to={`/events/${event.id}`}>
                    Learn More
                    <ArrowRight size={16} />
                  </LearnMoreButton>
                </EventContent>
              </EventCard>
            ))}
          </GridContainer>
        )}
      </EventsGrid>
    </PageWrapper>
  );
};

export default EventsPage;

// const events = [
//     {
//       id: 1,
//       slug: "luxury-car-show-2024",
//       title: "Los Angeles Auto Show 2024",
//       description:
//         "Join us at the prestigious LA Auto Show where we'll unveil our latest collection of luxury automotive masterpieces.",
//       image:
//         "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
//       date: "MAR 15",
//       status: "upcoming",
//       location: "Los Angeles Convention Center",
//       time: "10:00 AM - 6:00 PM",
//       attendees: "5000+",
//       type: "show",
//     },
//     {
//       id: 2,
//       title: "VIP Client Experience Day",
//       description:
//         "Exclusive event for our valued clients featuring test drives, personalized consultations, and luxury amenities.",
//       image:
//         "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/vip-event.jpg",
//       date: "FEB 28",
//       status: "upcoming",
//       location: "YOUNG BOY TOYZ Headquarters",
//       time: "2:00 PM - 8:00 PM",
//       attendees: "50",
//       type: "exclusive",
//     },
//     {
//       id: 3,
//       title: "Supercar Rally 2024",
//       description:
//         "Annual supercar rally through scenic California routes, featuring our most exotic modified vehicles.",
//       image:
//         "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/rally.jpg",
//       date: "APR 20",
//       status: "upcoming",
//       location: "Malibu to Big Sur",
//       time: "8:00 AM - 6:00 PM",
//       attendees: "200+",
//       type: "rally",
//     },
//     {
//       id: 4,
//       title: "Track Day Experience",
//       description:
//         "Professional track day at Laguna Seca featuring our performance-tuned vehicles and expert driving instruction.",
//       image:
//         "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/track-day.jpg",
//       date: "MAY 10",
//       status: "upcoming",
//       location: "Laguna Seca Raceway",
//       time: "9:00 AM - 5:00 PM",
//       attendees: "100",
//       type: "track",
//     },
//     {
//       id: 5,
//       title: "Miami Beach Concours",
//       description:
//         "Showcase of our finest luxury vehicles at the prestigious Miami Beach Concours d'Elegance.",
//       image:
//         "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/concours.jpg",
//       date: "JAN 15",
//       status: "past",
//       location: "Miami Beach",
//       time: "10:00 AM - 4:00 PM",
//       attendees: "3000+",
//       type: "show",
//     },
//     {
//       id: 6,
//       title: "Holiday Charity Gala",
//       description:
//         "Annual charity gala featuring auction of exclusive automotive experiences and luxury items.",
//       image:
//         "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/gala.jpg",
//       date: "DEC 20",
//       status: "past",
//       location: "Beverly Hills Hotel",
//       time: "7:00 PM - 11:00 PM",
//       attendees: "300",
//       type: "gala",
//     },
//   ];

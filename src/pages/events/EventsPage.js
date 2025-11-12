import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

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

const EventCard = styled(motion(Link))`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
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

const EventContent = styled.div`
  padding: 2rem;
`;

const EventTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: ;
`;

const EventDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventDateText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a0a0a0;
  margin-top: 1rem;
  font-weight: 500;
`;

// This was formerly <EventDate>
const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(4px);

  /* Set background color based on the 'status' prop */
  background-color: ${({ status }) => {
    switch (status) {
      case "Upcoming":
        return "rgba(59, 130, 246, 0.8)"; // Blue
      case "Ongoing":
        return "rgba(239, 68, 68, 0.8)"; // Red
      case "Completed":
        return "rgba(107, 114, 128, 0.8)"; // Gray
      default:
        return "rgba(0, 0, 0, 0.6)"; // Fallback
    }
  }};
`;

// This was formerly <EventStatus>
const TypeBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  background-color: ${({ type }) =>
    type === "PUBLIC" ? "#22c55e" : "#8b5cf6"};
  color: white;
`;

const EventPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a0a0a0;
  margin-top: 1rem;
  font-weight: 500;
`;

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

// 2. Create a base Skeleton element with the animation
const SkeletonElement = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #1a1a1a 8%, #2a2a2a 18%, #1a1a1a 33%);
  background-size: 800px 104px;
  border-radius: 4px;
`;

// 3. Create the skeleton card structure
const SkeletonCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const SkeletonImage = styled(SkeletonElement)`
  height: 250px;
  border-radius: 0;
`;

const SkeletonContent = styled.div`
  padding: 2rem;
`;

const SkeletonTitle = styled(SkeletonElement)`
  height: 1.5rem;
  width: 70%;
  margin-bottom: 1rem;
`;

const SkeletonDescription = styled(SkeletonElement)`
  height: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const SkeletonDescriptionShort = styled(SkeletonElement)`
  height: 1rem;
  width: 80%;
  margin-bottom: 1.5rem;
`;

const SkeletonPrice = styled(SkeletonElement)`
  height: 0.875rem;
  width: 40%;
  margin-top: 1rem;
`;

const SkeletonDate = styled(SkeletonElement)`
  height: 0.875rem;
  width: 50%;
  margin-top: 1rem;
`;

// 4. Assemble the final Skeleton Card Component
const EventCardSkeleton = () => (
  <SkeletonCardWrapper>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonTitle />
      <SkeletonDescription />
      <SkeletonDescriptionShort />
      <SkeletonPrice />
      <SkeletonDate />
    </SkeletonContent>
  </SkeletonCardWrapper>
);

const fetchEvents = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/events/user`);
  console.log("raw response", response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const responseData = await response.json();
  console.log("responseData :", responseData);
  return responseData;
};

const getEventStatus = (startDateStr, endDateStr) => {
  const now = new Date();
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (now > startDate && now < endDate) return "Ongoing";
  if (now < startDate) return "Upcoming";
  return "Completed";
};

const formatFullDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  const filters = useMemo(() => {
    const staticFilters = [
      { key: "all", label: "All Events" },
      { key: "upcoming", label: "Upcoming" },
    ];

    if (!data?.data) {
      return staticFilters;
    }

    // Use a Map to get all unique categories from the events list
    const uniqueCategories = new Map();
    data.data.forEach((event) => {
      event.categories?.forEach((category) => {
        if (!uniqueCategories.has(category.slug)) {
          uniqueCategories.set(category.slug, {
            key: category.slug,
            label: category.name,
          });
        }
      });
    });

    const dynamicFilters = Array.from(uniqueCategories.values());

    return [...staticFilters, ...dynamicFilters];
  }, [data]);

  const filteredEvents = useMemo(() => {
    const allEvents = data?.data || [];
    console.log("THis is inside allEvents", allEvents);
    return allEvents
      .map((event) => ({
        ...event,
        computedStatus: getEventStatus(event.startDate, event.endDate),
      }))
      .filter((event) => {
        if (activeFilter === "all") return true;

        if (activeFilter === "upcoming") {
          return event.computedStatus === "Upcoming";
        }

        // Check if any category slug in the event's categories array matches the active filter
        return event.categories?.some((cat) => cat.slug === activeFilter);
      });
  }, [data, activeFilter]);

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
        {isLoading && (
          <GridContainer>
            {/* Render 6 skeleton cards as a placeholder */}
            {[...Array(6)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </GridContainer>
        )}
        {isError && (
          <div style={{ textAlign: "center", color: "#f87171" }}>
            <h3>An Error Occurred</h3>
            <p>{error.message}</p>
          </div>
        )}
        {!isLoading && !isError && (
          <>
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
                {filteredEvents.map((event, index) => {
                  const fullDate = formatFullDate(event.startDate);
                  return (
                    <EventCard
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      to={`/events/${event.slug}`}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <EventImage image={event.primaryImage}>
                        <StatusBadge status={event.computedStatus}>
                          {event.computedStatus}
                        </StatusBadge>
                        <TypeBadge type={event.type}>{event.type}</TypeBadge>
                      </EventImage>
                      <EventContent>
                        <EventTitle>{event.title}</EventTitle>
                        <EventDescription>{event.description}</EventDescription>
                        <EventPrice>
                          ₹ {event.ticketTypes?.[0]?.price} onwards
                        </EventPrice>
                        <EventDateText>
                          <Calendar size={14} /> {fullDate}
                        </EventDateText>
                      </EventContent>
                    </EventCard>
                  );
                })}
              </GridContainer>
            )}
          </>
        )}
      </EventsGrid>
    </PageWrapper>
  );
};

export default EventsPage;

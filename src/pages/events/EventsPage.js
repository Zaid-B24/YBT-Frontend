import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useEvents } from "../../hooks/useEvent";
import { fetchEventCategoriesAPI } from "../../services/eventService";

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

const EventImageWrapper = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a; /* Placeholder color while loading */

  /* This targets the image inside the picture tag */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease;
  }

  /* Hover effect: Zoom in slightly */
  ${EventCard}:hover & img {
    transform: scale(1.05);
  }
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

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const { data: filterData } = useQuery({
    queryKey: ["eventFilters"],
    queryFn: fetchEventCategoriesAPI,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
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
  } = useEvents(activeFilter, { useInfinite: true });

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

  // 4. Infinite Scroll Observer
  const loadMoreRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            {events.length === 0 ? (
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
                {events.map((event, index) => {
                  return (
                    <EventCard
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      to={`/events/${event.slug}`}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <EventImageWrapper>
                        <picture>
                          {/* 1. Mobile Thumbnail (If exists, show on screens < 768px) */}
                          {event.mobileThumbnail && (
                            <source
                              media="(max-width: 768px)"
                              srcSet={event.mobileThumbnail}
                            />
                          )}

                          {/* 2. Desktop Thumbnail (Or fallback) */}
                          <img
                            src={
                              event.thumbnail || "/images/event-placeholder.jpg"
                            }
                            alt={event.title}
                            loading="lazy"
                          />
                        </picture>

                        {/* Badges sit on top via absolute positioning */}
                        <StatusBadge status={event.status}>
                          {event.status}
                        </StatusBadge>
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
                    </EventCard>
                  );
                })}
              </GridContainer>
            )}
            <div
              ref={loadMoreRef}
              style={{ height: "100px", marginTop: "2rem" }}
            >
              {isFetchingNextPage ? (
                <p style={{ textAlign: "center" }}>Loading more...</p>
              ) : !hasNextPage && events.length > 0 ? (
                <p style={{ textAlign: "center" }}>You've reached the end!</p>
              ) : null}
            </div>
          </>
        )}
      </EventsGrid>
    </PageWrapper>
  );
};

export default EventsPage;

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { EventCardSkeleton } from "./EventCardSkeleton";

export const EventsView = ({
  events,
  filters,
  activeFilter,
  onFilterChange,
  isLoading,
  isError,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageWrapper>
      <HeroSection
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroTitle variants={itemVariants}>Events</HeroTitle>
        <HeroSubtitle variants={itemVariants}>
          Experience the world of YOUNG BOY TOYZ through exclusive events,
          shows, and unforgettable automotive experiences.
        </HeroSubtitle>
        <motion.div variants={itemVariants}>
          <FilterTabs>
            {filters.map((filter) => (
              <FilterTab
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => onFilterChange(filter.key)}
              >
                {activeFilter === filter.key && (
                  <ActiveTabBackground
                    layoutId="activeFilter"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>
        </motion.div>
      </HeroSection>

      <EventsGrid>
        {isLoading && (
          <GridContainer>
            {[...Array(6)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </GridContainer>
        )}
        
        {isError && (
          <div style={{ textAlign: "center", color: "#f87171" }}>
            <h3>An Error Occurred</h3>
            <p>{error?.message}</p>
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

                        <StatusBadge status={event.status}>
                          {event.status}
                        </StatusBadge>
                        <TypeBadge type={event.type}>{event.type}</TypeBadge>
                      </EventImageWrapper>
                      
                      <EventContent>
                        <EventTitle>{event.title}</EventTitle>
                        <EventDescription>{event.description}</EventDescription>
                        {event.price && <EventPrice>{event.price}</EventPrice>}
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
              style={{ height: "100px", marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isFetchingNextPage ? (
                <p style={{ color: "#a0a0a0" }}>Loading more...</p>
              ) : !hasNextPage && events.length > 0 ? (
                <p style={{ color: "#a0a0a0" }}>You've reached the end!</p>
              ) : null}
            </div>
          </>
        )}
      </EventsGrid>
    </PageWrapper>
  );
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const textShine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
`;

const HeroSection = styled(motion.section)`
  padding: 6rem 2rem 4rem; /* Added slightly more top padding for standard navbars */
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: 4.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(
    to right,
    #ffffff 20%,
    #a1a1a1 40%,
    #ffffff 60%,
    #ffffff 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textShine} 5s linear infinite;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #a0a0a0;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto;
  flex-wrap: wrap;
  padding: 4px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: fit-content;
`;

const FilterTab = styled.button`
  position: relative;
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: none;
  color: ${(props) => (props.active ? "#000" : "#fff")};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 1;
  transition: color 0.3s ease;
  outline: none;

  &:hover {
    color: ${(props) => (props.active ? "#000" : "#ccc")};
  }
`;

const ActiveTabBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 30px;
  z-index: -1;
`;

const EventsGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1.25rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  /* Reduced 400px to 320px to prevent awkward squeezing on tablets */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Wrapping Link inside Framer Motion natively
const EventCard = styled(motion(Link))`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* CRITICAL: Resets default Link styles */
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const EventImageWrapper = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  ${EventCard}:hover & img {
    transform: scale(1.05);
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  background-color: ${({ status }) => {
    switch (status?.toLowerCase()) { // ToLowerCase safeguards against backend typos
      case "upcoming":
        return "rgba(59, 130, 246, 0.85)";
      case "ongoing":
        return "rgba(239, 68, 68, 0.85)";
      case "completed":
        return "rgba(107, 114, 128, 0.85)";
      default:
        return "rgba(0, 0, 0, 0.6)";
    }
  }};
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  background-color: ${({ type }) =>
    type?.toUpperCase() === "PUBLIC" ? "rgba(34, 197, 94, 0.9)" : "rgba(139, 92, 246, 0.9)"};
  color: white;
`;

const EventContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Pushes date to the bottom if descriptions vary in size */
`;

const EventTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem; /* Fixed broken CSS here */
  color: #fff;
  line-height: 1.3;
`;

const EventDescription = styled.p`
  color: #a3a3a3;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`;

const EventDateText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a0a0a0;
  font-weight: 500;
  margin-top: auto; /* Pushes to the bottom of the card */
`;


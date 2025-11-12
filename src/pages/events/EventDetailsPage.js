import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  Users,
  Share2,
  AirVent,
  UtensilsCrossed,
  Waves,
  Lightbulb,
  Send,
  Wifi,
  Car,
  Accessibility,
  Utensils,
  HelpCircle,
  Feather,
  Minimize2,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import LockedLocation from "../../components/common/LockedEvents";
import { useEffect, useMemo, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 1. Page Layout & Structure
const PageWrapper = styled.div`
  padding: 80px 1.5rem 2rem 1.5rem;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
`;

const EventLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled(motion.div)`
  position: sticky;
  top: 80px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const EventTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 500;
`;

// 3. Content Blocks & Typography
const MainContent = styled(motion.div)``;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  color: #ccc;
  line-height: 1.8;
  font-size: 1rem;
`;

// 4. Information & Lists
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* More space */
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #E0E0E0; /* Match body text */
  font-size: 0.95rem;

  svg {
    flex-shrink: 0;
    /* Use a consistent, non-gray color for icons. The yellow from Lightbulb is a good choice. */
    color: #facc15;
  }
`;

const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const FacilityItem = styled.div`
  /* Use a complementary dark color for cards */
  background: #1C1E22;
  /* Make borders even more subtle */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #E0E0E0;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;

  svg {
    color: #facc15; /* Use the same yellow for icon consistency */
  }

  &:hover {
    background-color: #25272B; /* Subtle hover for interaction */
  }
`;

// 5. Cards & Containers
const DetailsCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LocationCard = styled(DetailsCard)``;

const InfoBox = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoBoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #f0f0f0;
`;

const InfoBoxList = styled.ul`
  list-style-position: inside;
  padding-left: 0.5rem;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li::marker {
    color: #ef4444;
  }
`;

// 6. Buttons & Actions
const EventActions = styled.div`
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;

  span {
    font-size: 0.9rem;
    font-weight: 400;
    color: #ccc;
    display: block;
  }
`;

const BookNowButton = styled(motion.button)`
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
    transform: translateY(-2px);
  }
`;

const ShareButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const TermsndCondiitonsButton = styled.button`
  display: block;
  width: fit-content;
  margin: 2.5rem auto 0; /* Adds space above and centers it */
  padding: 0.5rem 0; /* Adds some vertical clickable area */

  /* Reset default button appearance */
  background: transparent;
  border: none;

  /* Theming to match your page */
  color: #a0a0a0; /* A muted white for secondary text */
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px; /* Pushes the underline down slightly */

  /* Interactivity */
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #fff; /* Brightens to full white on hover */
  }
`;

const DirectionsButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MediaContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9; /* Ensures a consistent shape */
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #000;
`;

const DisplayedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const DisplayedVideo = styled(motion.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap; /* Allows thumbnails to wrap on smaller screens */
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid
    ${(props) => (props.isActive ? "#ef4444" : "rgba(255, 255, 255, 0.2)")};
  transition: border-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #ef4444;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const facilityIconMap = {
  "Air Conditioned": <AirVent size={24} />,
  "Family Friendly": <Users size={24} />,
  "Outside Food Not Allowed": <UtensilsCrossed size={24} />,
  Restrooms: <Waves size={24} />,
  "Free WiFi": <Wifi size={24} />,
  "Parking Available": <Car size={24} />,
  "Wheelchair Accessible": <Accessibility size={24} />,
  "Lunch Provided": <Utensils size={24} />,
  Soft: <Feather size={24} />,
  Small: <Minimize2 size={24} />,
  Luxurious: <Sparkles size={24} />,
  // Add any other facilities you expect from your backend
};

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

const EventDetailsSkeleton = () => (
  <PageWrapper>
    <EventLayout>
      <LeftColumn>
        {/* Media Skeleton */}
        <SkeletonElement
          style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: "12px" }}
        />

        {/* Thumbnails Skeleton */}
        <ThumbnailContainer>
          <SkeletonElement
            style={{ width: "80px", height: "60px", borderRadius: "8px" }}
          />
          <SkeletonElement
            style={{ width: "80px", height: "60px", borderRadius: "8px" }}
          />
          <SkeletonElement
            style={{ width: "80px", height: "60px", borderRadius: "8px" }}
          />
        </ThumbnailContainer>

        {/* About Section Skeleton */}
        <MainContent>
          <SkeletonElement
            style={{ height: "2rem", width: "40%", marginBottom: "1.5rem" }}
          />
          <SkeletonElement
            style={{ height: "1rem", width: "100%", marginBottom: "0.75rem" }}
          />
          <SkeletonElement
            style={{ height: "1rem", width: "100%", marginBottom: "0.75rem" }}
          />
          <SkeletonElement
            style={{ height: "1rem", width: "80%", marginBottom: "0.75rem" }}
          />
        </MainContent>

        {/* You Should Know Skeleton */}
        <div>
          <SkeletonElement
            style={{ height: "2rem", width: "50%", marginBottom: "1rem" }}
          />
          <InfoBox>
            <SkeletonElement
              style={{ height: "1.5rem", width: "60%", marginBottom: "1rem" }}
            />
            <SkeletonElement
              style={{ height: "1rem", width: "90%", marginBottom: "0.5rem" }}
            />
            <SkeletonElement
              style={{ height: "1rem", width: "85%", marginBottom: "0.5rem" }}
            />
          </InfoBox>
        </div>

        {/* Facilities Skeleton */}
        <div>
          <SkeletonElement
            style={{ height: "2rem", width: "30%", marginBottom: "1rem" }}
          />
          <FacilitiesGrid>
            <SkeletonElement style={{ height: "60px", borderRadius: "12px" }} />
            <SkeletonElement style={{ height: "60px", borderRadius: "12px" }} />
            <SkeletonElement style={{ height: "60px", borderRadius: "12px" }} />
          </FacilitiesGrid>
        </div>
      </LeftColumn>

      <RightColumn>
        {/* Details Card Skeleton */}
        <DetailsCard>
          <EventHeader>
            <SkeletonElement style={{ height: "2.2rem", width: "80%" }} />
          </EventHeader>
          <InfoList>
            <SkeletonElement
              style={{ height: "1.5rem", width: "70%", marginBottom: "0.5rem" }}
            />
            <SkeletonElement style={{ height: "1.5rem", width: "50%" }} />
          </InfoList>
          <EventActions>
            <SkeletonElement style={{ height: "2rem", width: "40%" }} />
            <SkeletonElement
              style={{ height: "44px", width: "120px", borderRadius: "8px" }}
            />
          </EventActions>
        </DetailsCard>

        {/* Location Card Skeleton */}
        <LocationCard>
          <SkeletonElement
            style={{ height: "1.5rem", width: "50%", marginBottom: "1rem" }}
          />
          <SkeletonElement
            style={{ height: "45px", width: "100%", borderRadius: "8px" }}
          />
        </LocationCard>
      </RightColumn>
    </EventLayout>
  </PageWrapper>
);

const formatDateRange = (startDateStr, endDateStr) => {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const formattedStart = new Intl.DateTimeFormat("en-US", options).format(
    startDate
  );

  if (endDateStr && startDate.toDateString() !== endDate.toDateString()) {
    const formattedEnd = new Intl.DateTimeFormat("en-US", options).format(
      endDate
    );
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart;
};

const EventDetailsPage = () => {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();
  const [currentMedia, setCurrentMedia] = useState(null);

  const fetchEventDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/events/${slug}`
    );
    if (!response.ok) {
      throw new Error("Event not found or failed to fetch.");
    }
    const responseData = await response.json();
    console.log("responseData :", responseData);
    return responseData.data;
  };

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["event", slug],
    queryFn: fetchEventDetails,
    enabled: !!slug,
  });

  const mediaGallery = useMemo(() => {
    const images = event?.imageUrls || [];
    const videos = event?.videoUrls || [];
    const imageMedia = images.map((url) => ({
      type: "image",
      url: url,
      thumbnail: url,
    }));
    const videoMedia = videos.map((url) => ({
      type: "video",
      url: url,
      thumbnail: event.primaryImage,
    }));

    return [...imageMedia, ...videoMedia];
  }, [event]);

  useEffect(() => {
    if (mediaGallery.length > 0) {
      setCurrentMedia(mediaGallery[0]);
    }
  }, [mediaGallery]);

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: event.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=18.922064,72.834641`;
    if (mapsUrl) {
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Directions are not available for this venue.");
    }
  };

  if (isLoading) return <EventDetailsSkeleton />;
  if (isError) return <PageWrapper>Error: {error.message}</PageWrapper>;
  if (!event) return <PageWrapper>Event not found.</PageWrapper>;

  // Data for rendering
  const eventDetails = [
    {
      icon: <Calendar size={20} />,
      text: formatDateRange(event.startDate, event.endDate),
    },
    {
      icon: <Clock size={20} />,
      text: `Starts at ${new Date(event.startDate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    },
  ];

  const facilities = (event.facilities || []).map((text) => ({
    text: text,
    icon: facilityIconMap[text] || <HelpCircle size={24} />, // Use the mapped icon or a default one
  }));

  return (
    <PageWrapper>
      <EventLayout>
        <LeftColumn>
          {currentMedia && (
            <MediaContainer>
              {currentMedia.type === "image" ? (
                <DisplayedImage
                  key={currentMedia.url} // Key helps framer-motion re-animate on change
                  src={currentMedia.url}
                  alt="Event gallery image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <DisplayedVideo
                  key={currentMedia.url}
                  src={currentMedia.url}
                  poster={currentMedia.thumbnail}
                  autoPlay
                  loop
                  muted
                  playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </MediaContainer>
          )}

          {/* Thumbnail navigation */}
          {mediaGallery && mediaGallery.length > 1 && (
            <ThumbnailContainer>
              {mediaGallery.map((mediaItem, index) => (
                <Thumbnail
                  key={index}
                  isActive={currentMedia?.url === mediaItem.url}
                  onClick={() => setCurrentMedia(mediaItem)}
                >
                  <img
                    src={mediaItem.thumbnail}
                    alt={`View media ${index + 1}`}
                  />
                </Thumbnail>
              ))}
            </ThumbnailContainer>
          )}
          {/* <TagContainer>
            <Tag>Great</Tag>
            <Tag>Trending</Tag>
          </TagContainer> */}

          <MainContent
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle>About The Event</SectionTitle>
            <Description
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </MainContent>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle>You Should Know</SectionTitle>
            <InfoBox>
              <InfoBoxHeader>
                <Lightbulb size={24} color="#facc15" />
                <span>Important Information</span>
              </InfoBoxHeader>
              <InfoBoxList>
                {(event.youshouldKnow || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </InfoBoxList>
            </InfoBox>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle>Facilities</SectionTitle>
            <FacilitiesGrid>
              {facilities.map((facility, index) => (
                <FacilityItem key={index}>
                  {facility.icon}
                  <span>{facility.text}</span>
                </FacilityItem>
              ))}
            </FacilitiesGrid>
            <TermsndCondiitonsButton>
              Terms & Condiitons
            </TermsndCondiitonsButton>
          </motion.div>
        </LeftColumn>

        <RightColumn initial="hidden" animate="visible" variants={fadeUp}>
          <DetailsCard>
            <EventHeader>
              <EventTitle>{event.title}</EventTitle>
              <ShareButton onClick={handleShare}>
                <Share2 size={18} />
              </ShareButton>
            </EventHeader>

            <InfoList>
              {eventDetails.map((detail, index) => (
                <InfoItem key={index}>
                  {detail.icon}
                  <span>{detail.text}</span>
                </InfoItem>
              ))}
            </InfoList>

            <EventActions>
              <PriceInfo>
                {event.ticketTypes?.[0]?.price ? (
                  <>
                    ₹{event.ticketTypes[0].price}
                    <span>onwards</span>
                  </>
                ) : (
                  <span>Pricing not available</span>
                )}
              </PriceInfo>
              <Link to={`/book/${event.slug}`}>
                <BookNowButton>Book Now</BookNowButton>
              </Link>
            </EventActions>
          </DetailsCard>
          {isLoggedIn ? (
            <LocationCard>
              <SectionTitle
                style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
              >
                Location
              </SectionTitle>
              <DirectionsButton onClick={handleGetDirections}>
                <Send size={16} />
                Get Directions
              </DirectionsButton>
            </LocationCard>
          ) : (
            <LockedLocation />
          )}
        </RightColumn>
      </EventLayout>
    </PageWrapper>
  );
};

export default EventDetailsPage;

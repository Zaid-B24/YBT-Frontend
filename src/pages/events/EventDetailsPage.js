import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  ExternalLink,
  Share2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateX(-5px);
  }
`;

const EventCategory = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EventTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EventSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const EventMeta = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const RegisterButton = styled(motion.button)`
  background: linear-gradient(45deg, #fff, #f0f0f0);
  color: #000;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const ContentBlock = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const Description = styled.div`
  color: #ccc;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const AgendaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AgendaItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
`;

const AgendaTime = styled.div`
  font-weight: 600;
  color: #fff;
  min-width: 80px;
`;

const AgendaContent = styled.div`
  flex: 1;

  h3 {
    color: #fff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #ccc;
    font-size: 0.9rem;
  }
`;

const SidebarCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #ccc;

  svg {
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`;

const ShareButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const EventDetailsPage = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchEventDetails = async (eventSlug) => {
    // This is the API call to get a single event by its slug
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/events/${id}`
    );
    if (!response.ok) {
      throw new Error("Event not found or failed to fetch.");
    }
    return response.json();
  };

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["event", id], // A unique key for this query
    queryFn: () => fetchEventDetails(id),
    enabled: !!id, // Only run the query if a slug exists
  });

  // const event = eventData[id] || eventData["luxury-car-show-2024"];

  const handleRegister = () => {
    setIsRegistered(true);
    // In a real app, this would make an API call
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.title,
        text: event.subtitle,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <PageWrapper>Loading event details...</PageWrapper>;
  }

  if (isError) {
    return <PageWrapper>Error: {error.message}</PageWrapper>;
  }

  if (!event) {
    return <PageWrapper>Event not found.</PageWrapper>;
  }

  return (
    <PageWrapper>
      <HeroSection image={event.primaryImage}>
        <HeroOverlay />
        <BackButton to="/events">
          <ArrowLeft size={20} />
        </BackButton>
        <HeroContent>
          {/* <EventCategory>{event.category}</EventCategory> */}
          <EventTitle>{event.title}</EventTitle>
          {/* <EventSubtitle>{event.subtitle}</EventSubtitle> */}
          <EventMeta>
            <MetaItem>
              <Calendar size={16} />
              <span>
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </MetaItem>
            <MetaItem>
              <Clock size={16} />
              <span>
                {new Date(event.startDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </MetaItem>
            <MetaItem>
              <MapPin size={16} />
              <span>{event.location}</span>
            </MetaItem>
            <MetaItem>
              <Users size={16} />
              <span>{event.maxAttendees}</span>
            </MetaItem>
          </EventMeta>
          <RegisterButton
            onClick={handleRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isRegistered}
          >
            {isRegistered ? "Registered ✓" : "Register Now"}
          </RegisterButton>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <MainContent>
          <ContentBlock>
            <SectionTitle>About This Event</SectionTitle>
            <Description
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </ContentBlock>

          <ContentBlock>
            <SectionTitle>Event Agenda</SectionTitle>
            <AgendaList>
              {event.agenda?.map((item, index) => (
                <AgendaItem key={index}>
                  <AgendaTime>
                    {new Date(item.time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </AgendaTime>
                  <AgendaContent>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </AgendaContent>
                </AgendaItem>
              ))}
            </AgendaList>
          </ContentBlock>
        </MainContent>

        <Sidebar>
          <SidebarCard>
            <SidebarTitle>Event Details</SidebarTitle>
            <InfoList>
              <InfoItem>
                <Calendar size={16} />
                <div>
                  <strong>Date</strong>
                  <br />
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </InfoItem>
              <InfoItem>
                <Clock size={16} />
                <div>
                  <strong>Time</strong>
                  <br />
                  {new Date(event.startDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </InfoItem>
              <InfoItem>
                <MapPin size={16} />
                <div>
                  <strong>Location</strong>
                  <br />
                  {event.location}
                  <br />
                  <small>{event.address}</small>
                </div>
              </InfoItem>
              <InfoItem>
                <Users size={16} />
                <div>
                  <strong>Expected Attendance</strong>
                  <br />
                  {/* Use currentAttendees and maxAttendees */}
                  {event.currentAttendees} / {event.maxAttendees}
                </div>
              </InfoItem>
            </InfoList>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>Share Event</SidebarTitle>
            <ShareButton onClick={handleShare}>
              <Share2 size={16} />
              Share Event
            </ShareButton>
          </SidebarCard>
        </Sidebar>
      </ContentSection>
    </PageWrapper>
  );
};

export default EventDetailsPage;

// Mock event data - in a real app, this would come from an API
// const eventData = {
//   "luxury-car-show-2024": {
//     title: "Luxury Car Show 2024",
//     subtitle: "The Ultimate Automotive Experience",
//     category: "Auto Show",
//     date: "2024-04-15",
//     time: "10:00 AM - 6:00 PM",
//     location: "Los Angeles Convention Center",
//     address: "1201 S Figueroa St, Los Angeles, CA 90015",
//     attendees: "5,000+ Expected",
//     image:
//       "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
//     description: `
//       <p>Join us for the most prestigious luxury car show on the West Coast. Experience the latest in automotive excellence, from classic vintage cars to cutting-edge supercars.</p>
//       <p>YOUNG BOY TOYZ will be showcasing our latest customization projects, including exclusive one-off builds and limited edition collections. Meet our master craftsmen and discover the artistry behind luxury automotive customization.</p>
//       <p>This exclusive event features live demonstrations, expert panels, and networking opportunities with industry leaders and fellow automotive enthusiasts.</p>
//     `,
//     agenda: [
//       {
//         time: "10:00 AM",
//         title: "Doors Open & Registration",
//         description: "Welcome reception and event registration",
//       },
//       {
//         time: "11:00 AM",
//         title: "YOUNG BOY TOYZ Showcase",
//         description: "Unveiling of our latest custom builds and collections",
//       },
//       {
//         time: "1:00 PM",
//         title: "Expert Panel Discussion",
//         description: "The Future of Luxury Automotive Customization",
//       },
//       {
//         time: "3:00 PM",
//         title: "Live Customization Demo",
//         description: "Watch our craftsmen work on exclusive pieces",
//       },
//       {
//         time: "5:00 PM",
//         title: "Networking Reception",
//         description: "Connect with industry leaders and enthusiasts",
//       },
//     ],
//   },
// };

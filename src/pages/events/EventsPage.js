import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";

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
  const [event, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/events`);
        console.log(response, "THis is events response");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, "THis is Parsed JSOn data");
        setEvents(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchEvents();
  }, []);

  const events = [
    {
      id: 1,
      slug: "luxury-car-show-2024",
      title: "Los Angeles Auto Show 2024",
      description:
        "Join us at the prestigious LA Auto Show where we'll unveil our latest collection of luxury automotive masterpieces.",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      date: "MAR 15",
      status: "upcoming",
      location: "Los Angeles Convention Center",
      time: "10:00 AM - 6:00 PM",
      attendees: "5000+",
      type: "show",
    },
    {
      id: 2,
      title: "VIP Client Experience Day",
      description:
        "Exclusive event for our valued clients featuring test drives, personalized consultations, and luxury amenities.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/vip-event.jpg",
      date: "FEB 28",
      status: "upcoming",
      location: "YOUNG BOY TOYZ Headquarters",
      time: "2:00 PM - 8:00 PM",
      attendees: "50",
      type: "exclusive",
    },
    {
      id: 3,
      title: "Supercar Rally 2024",
      description:
        "Annual supercar rally through scenic California routes, featuring our most exotic modified vehicles.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/rally.jpg",
      date: "APR 20",
      status: "upcoming",
      location: "Malibu to Big Sur",
      time: "8:00 AM - 6:00 PM",
      attendees: "200+",
      type: "rally",
    },
    {
      id: 4,
      title: "Track Day Experience",
      description:
        "Professional track day at Laguna Seca featuring our performance-tuned vehicles and expert driving instruction.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/track-day.jpg",
      date: "MAY 10",
      status: "upcoming",
      location: "Laguna Seca Raceway",
      time: "9:00 AM - 5:00 PM",
      attendees: "100",
      type: "track",
    },
    {
      id: 5,
      title: "Miami Beach Concours",
      description:
        "Showcase of our finest luxury vehicles at the prestigious Miami Beach Concours d'Elegance.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/concours.jpg",
      date: "JAN 15",
      status: "past",
      location: "Miami Beach",
      time: "10:00 AM - 4:00 PM",
      attendees: "3000+",
      type: "show",
    },
    {
      id: 6,
      title: "Holiday Charity Gala",
      description:
        "Annual charity gala featuring auction of exclusive automotive experiences and luxury items.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/gala.jpg",
      date: "DEC 20",
      status: "past",
      location: "Beverly Hills Hotel",
      time: "7:00 PM - 11:00 PM",
      attendees: "300",
      type: "gala",
    },
  ];

  const filters = [
    { key: "all", label: "All Events" },
    { key: "upcoming", label: "Upcoming" },
    { key: "show", label: "Auto Shows" },
    { key: "exclusive", label: "Exclusive" },
    { key: "rally", label: "Rallies" },
    { key: "track", label: "Track Days" },
  ];

  const filteredEvents = event.filter((event) => {
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
                <EventDate>{event.date}</EventDate>
                <EventStatus status={event.status}>{event.status}</EventStatus>
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
                    <span>{event.startDate}</span>
                  </EventDetail>
                  <EventDetail>
                    <Users size={16} />
                    <span>{event.maxAttendees} attendees</span>
                  </EventDetail>
                </EventDetails>
                <LearnMoreButton to={`/events/${event.slug || event.id}`}>
                  Learn More
                  <ArrowRight size={16} />
                </LearnMoreButton>
              </EventContent>
            </EventCard>
          ))}
        </GridContainer>
      </EventsGrid>
    </PageWrapper>
  );
};

export default EventsPage;

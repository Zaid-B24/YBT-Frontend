import React from "react";
import { Link } from "react-router-dom";
import { Share2, Send, Calendar, Clock } from "lucide-react";
import styled from "styled-components";
import { motion } from "framer-motion";
import LockedLocation from "../../common/LockedEvents";
import { formatDateRange } from "../../../utils/formatdate";

export const EventSidebar = ({ event, isLoggedIn }) => {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.subtitle || "Check out this event!",
          url: url,
        });
        return;
      } catch (error) {
        if (error.name === "AbortError") return; 
        console.error("Error sharing:", error);
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Event link copied to clipboard!");
        return;
      } catch (error) {
        console.error("Failed to copy using clipboard API", error);
      }
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        alert("Event link copied to clipboard!");
      } else {
        alert("Unable to copy the link automatically.");
      }
    } catch (err) {
      console.error("Fallback copy failed", err);
      alert("Unable to copy the link automatically.");
    }
  };

  const handleGetDirections = () => {
    if (event?.location) window.open(event.location, "_blank", "noopener,noreferrer");
    else alert("Directions are not available.");
  };

  return (
    <>
      <DetailsCard>
        <EventHeader>
          <EventTitle>{event.title}</EventTitle>
          <ShareButton onClick={handleShare}>
            <Share2 size={18} />
          </ShareButton>
        </EventHeader>

        {/* Info List Items */}
        <InfoList>
           <InfoItem>
             <Calendar size={20} />
             <span>{formatDateRange(event.startDate, event.endDate)}</span>
           </InfoItem>
           <InfoItem>
             <Clock size={20} />
             <span>Starts at {new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
           </InfoItem>
        </InfoList>

        <EventActions>
          <PriceInfo>
            {event.ticketTypes?.[0]?.price ? (
              <>₹{event.ticketTypes[0].price} <span>onwards</span></>
            ) : (
              <span>Pricing not available</span>
            )}
          </PriceInfo>
          <StyledLink to={`/book/${event.slug}`}>
            <BookNowButton>Book Now</BookNowButton>
          </StyledLink>
        </EventActions>
      </DetailsCard>

      {isLoggedIn ? (
        <LocationCard>
          <SectionTitle style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Location</SectionTitle>
          <DirectionsButton onClick={handleGetDirections}>
            <Send size={16} /> Get Directions
          </DirectionsButton>
        </LocationCard>
      ) : (
        <LockedLocation />
      )}
    </>
  );
};

const DetailsCard = styled.div`
  background: rgba(30, 30, 32, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* Adds depth */

  @media (max-width: 768px) {
    padding: 1.5rem; 
    gap: 1.25rem;
    border-radius: 12px;
  }
`;

export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const EventTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem; 
  }
`;

const ShareButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
  padding: 0.75rem; /* Increased padding for a better mobile touch target */
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    transform: translateY(-2px);
  }
  
  /* Ensure minimum tap target size for mobile accessibility */
  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08); /* Separator line */
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #d1d5db; /* Softer text color */
  font-size: 0.95rem;
  font-weight: 500;

  svg {
    flex-shrink: 0;
    color: #facc15;
    width: 20px; 
    height: 20px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EventActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const PriceInfo = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  span {
    font-size: 0.85rem;
    font-weight: 400;
    color: #9ca3af; /* Gray-400 */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

// Crucial: React Router's <Link> messes up Flexbox/CSS occasionally. 
// Wrap your BookNowButton inside this StyledLink.
const StyledLink = styled(Link)`
  text-decoration: none;
  /* Allows the button to grow if needed, or stay fixed */
  flex-shrink: 0; 
`;

const BookNowButton = styled(motion.button)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); /* Richer red */
  color: #fff;
  border: none;
  padding: 0.9rem 2.2rem;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3); /* Subtle red glow */
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5); /* Glow expands on hover */
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
  }
`;

const LocationCard = styled(DetailsCard)`
  /* Slightly less visual weight than the main Details card */
  background: rgba(30, 30, 32, 0.4);
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 0 !important; /* Overriding inline style from your component */
`;

const DirectionsButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;
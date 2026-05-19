
import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb} from "lucide-react";
import styled from "styled-components";
import { ExpandableDescription } from "./ExpandableEventDescription";



export const EventDescription = ({ event }) => {
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const facilities = event.facilities || [];

  return (
    <ContentWrapper>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
        <SectionTitle>About The Event</SectionTitle>
        <ExpandableDescription text={event.description} />
      </motion.div>

      {event.youshouldKnow?.length > 0 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}>
          <SectionTitle>You Should Know</SectionTitle>
          <InfoBox>
            <InfoBoxHeader>
              <Lightbulb size={24} color="#facc15" />
              <span>Important Information</span>
            </InfoBoxHeader>
            <InfoBoxList>
              {event.youshouldKnow.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </InfoBoxList>
          </InfoBox>
        </motion.div>
      )}

     {facilities.length > 0 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}>
          <SectionTitle>Facilities</SectionTitle>
          <FacilitiesGrid>
            {/* Map directly over the strings and apply the generic icon */}
            {facilities.map((facilityText, index) => (
              <FacilityItem key={index}>
                <IconWrapper>
                  <CheckCircle2 size={20} />
                </IconWrapper>
                <span>{facilityText}</span>
              </FacilityItem>
            ))}
          </FacilitiesGrid>
        </motion.div>
      )}
    </ContentWrapper>
  );
};

// --- STYLED COMPONENTS ---

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem; /* Creates consistent breathing room between the 3 sections */
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin-bottom: 1.25rem;
  letter-spacing: 0.5px;
  color: #f3f4f6; /* Slightly off-white for softer contrast */
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const InfoBox = styled.div`
  background: rgba(250, 204, 21, 0.05); /* Very subtle yellow tint matching the icon */
  border: 1px solid rgba(250, 204, 21, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoBoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #facc15; /* Make the header text match the yellow warning icon */
`;

export const InfoBoxList = styled.ul`
  list-style-position: inside;
  padding-left: 0.25rem;
  color: #d1d5db;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Increased gap for better readability */
  line-height: 1.5;

  li::marker {
    color: #facc15; /* Match the yellow theme of the info box */
  }
`;

export const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* auto-fill prevents awkward stretching */
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; 
    gap: 0.75rem;
  }
`;

export const FacilityItem = styled.div`
  background: rgba(255, 255, 255, 0.03); /* Modern glass-like background */
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  /* Subtle hover effect makes the UI feel premium */
  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    font-size: 0.85rem;
    flex-direction: column; 
    text-align: center;
    gap: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #facc15; /* Ensure all icons inherit this yellow color cleanly */
  
  /* On mobile, wrapping the icon ensures it doesn't shrink awkwardly */
  @media (max-width: 768px) {
    margin-bottom: 0.25rem;
  }
`;
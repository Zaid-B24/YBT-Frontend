import { EventMediaGallery } from "./EventMediaGallery";
import { EventDescription } from "./EventDescription";
import styled from "styled-components";
import { motion } from "framer-motion";
import { EventSidebar } from "./EventSidebar";

export const EventDetailsView = ({ event, isLoggedIn }) => {
 return (
    <PageWrapper>
        <EventLayout>
            <LeftColumn>
                <EventMediaGallery event={event} />
                <EventDescription event={event} />
            </LeftColumn>
            <RightColumn>
                <EventSidebar event={event} isLoggedIn={isLoggedIn} />
            </RightColumn>
        </EventLayout>
    </PageWrapper>
 )
}

export const PageWrapper = styled.div`
  /* Using 4% side padding keeps fluid spacing on ultra-wide screens */
  padding: 80px 4% 4rem 4%; 
  min-height: 100vh;
  background: #0a0a0a;
  /* Slightly softened white (#f3f4f6) reduces eye strain on dark backgrounds */
  color: #f3f4f6; 

  @media (max-width: 768px) {
    /* Tighter padding for mobile devices */
    padding: 60px 1.25rem 2rem 1.25rem;
  }
`;

export const EventLayout = styled.div`
  /* Increased from 1200px to 1440px to utilize more screen real estate */
  max-width: 1440px; 
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  display: grid;
  
  /* 
    minmax(0, 1fr) ensures the left column can shrink properly if content overflows.
    minmax(320px, 400px) keeps the sidebar from getting ridiculously wide on huge screens, 
    but prevents it from squishing too small on medium screens.
  */
  grid-template-columns: minmax(0, 1fr) minmax(320px, 400px); 
  gap: 4rem; 

  /* Tablet adjustment */
  @media (max-width: 1024px) {
    gap: 2rem;
    grid-template-columns: minmax(0, 1.5fr) 300px;
  }

  /* Mobile adjustment */
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding-top: 1rem;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* Increased slightly for better vertical rhythm */
  
  /* Ensure images/videos inside don't overflow the grid */
  width: 100%;
  overflow: hidden; 
`;

export const RightColumn = styled(motion.div)`
  position: sticky;
  /* Added a bit more top clearance so it doesn't hug the navbar too tightly */
  top: 100px; 
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Subtle performance boost for sticky elements */
  will-change: transform; 
`;
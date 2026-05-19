import React from "react";
import styled, { keyframes } from "styled-components";

export const EventCardSkeleton = () => (
  <SkeletonCardWrapper>
    <SkeletonImageWrapper>
      <SkeletonImage />
      {/* Mimics the StatusBadge and TypeBadge */}
      <SkeletonBadgeLeft />
      <SkeletonBadgeRight />
    </SkeletonImageWrapper>
    
    <SkeletonContent>
      <SkeletonTitle />
      <SkeletonDescription />
      <SkeletonDescriptionShort />
      
      {/* Pushed to the bottom by flex-grow */}
      <BottomSection>
        <SkeletonPrice />
        <SkeletonDate />
      </BottomSection>
    </SkeletonContent>
  </SkeletonCardWrapper>
);

// --- ANIMATION ---

// A much smoother, wider sweep for dark mode
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonElement = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite ease-in-out;
  border-radius: 6px; /* Softer rounded corners for text lines */
`;

// --- STRUCTURE ---

const SkeletonCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px; /* Matched the new EventCard radius */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures it fills the grid properly */
`;

const SkeletonImageWrapper = styled.div`
  height: 250px;
  position: relative;
  width: 100%;
`;

const SkeletonImage = styled(SkeletonElement)`
  width: 100%;
  height: 100%;
  border-radius: 0;
`;

const SkeletonBadgeLeft = styled(SkeletonElement)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 80px;
  height: 24px;
  border-radius: 20px;
`;

const SkeletonBadgeRight = styled(SkeletonElement)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 60px;
  height: 24px;
  border-radius: 20px;
`;

const SkeletonContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allows bottom section to be pushed down */
`;

const SkeletonTitle = styled(SkeletonElement)`
  height: 1.5rem;
  width: 65%;
  margin-bottom: 1.25rem;
  border-radius: 8px;
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

const BottomSection = styled.div`
  margin-top: auto; /* Pushes price and date to the absolute bottom of the card */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonPrice = styled(SkeletonElement)`
  height: 1.1rem;
  width: 30%;
`;

const SkeletonDate = styled(SkeletonElement)`
  height: 0.875rem;
  width: 45%;
`;
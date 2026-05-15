// Global Event Module Styles
// Use these across all event pages to maintain consistency

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// ============================================
// Animations
// ============================================
export const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

// ============================================
// Page Layout Components
// ============================================
export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem auto;
  }
`;

export const HeroSection = styled(motion.section)`
  text-align: center;
  padding: 3rem 0 4rem;
  position: relative;
  z-index: 1;
`;

export const HeroTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

// ============================================
// Filter Components
// ============================================
export const FilterTabs = styled.div`
  display: inline-flex;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 4px;
`;

export const FilterTab = styled.button`
  position: relative;
  background: transparent;
  border: none;
  color: ${({ active }) => (active ? "#111" : "#fff")};
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 1;

  &:hover {
    color: ${({ active }) => (active ? "#111" : "rgba(255, 255, 255, 0.8)")};
  }
`;

export const ActiveTabBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #fff;
  border-radius: 100px;
  z-index: -1;
`;

// ============================================
// Grid Components
// ============================================
export const EventsGrid = styled.div`
  position: relative;
  z-index: 1;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// ============================================
// Event Card Components
// ============================================
export const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const EventImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const EventContent = styled.div`
  padding: 1.5rem;
`;

export const EventTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

export const EventDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const EventDateText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a0a0a0;
  font-weight: 500;
`;

export const EventPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a0a0a0;
  margin-top: 1rem;
  font-weight: 500;
`;

// ============================================
// Badge Components
// ============================================
export const StatusBadge = styled.div`
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
  background-color: ${({ status }) => {
    switch (status) {
      case "Upcoming":
        return "rgba(59, 130, 246, 0.8)";
      case "Ongoing":
        return "rgba(239, 68, 68, 0.8)";
      case "Completed":
        return "rgba(107, 114, 128, 0.8)";
      default:
        return "rgba(0, 0, 0, 0.6)";
    }
  }};
`;

export const TypeBadge = styled.div`
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

// ============================================
// Skeleton Components
// ============================================
export const SkeletonElement = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #1a1a1a 8%, #2a2a2a 18%, #1a1a1a 33%);
  background-size: 800px 104px;
  border-radius: 4px;
`;

export const SkeletonCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

export const SkeletonImage = styled(SkeletonElement)`
  height: 250px;
  border-radius: 0;
`;

export const SkeletonContent = styled.div`
  padding: 2rem;
`;

export const SkeletonTitle = styled(SkeletonElement)`
  height: 1.5rem;
  width: 70%;
  margin-bottom: 1rem;
`;

export const SkeletonDescription = styled(SkeletonElement)`
  height: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const SkeletonText = styled(SkeletonElement)`
  height: 0.875rem;
  width: ${({ width }) => width || "50%"};
  margin-top: ${({ marginTop }) => marginTop || "0.5rem"};
`;

// ============================================
// Utility Components
// ============================================
export const LoadMoreContainer = styled.div`
  height: 100px;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorState = styled.div`
  text-align: center;
  color: #f87171;
  padding: 2rem;
`;

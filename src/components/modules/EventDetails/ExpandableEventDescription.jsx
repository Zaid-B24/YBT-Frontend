import { ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

export const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);

  // Check if the text is actually long enough to need a "Read More" button
  useEffect(() => {
    if (contentRef.current) {
      // If the scrollHeight is greater than the clientHeight, text is overflowing
      setIsTruncated(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [text]);

  // If there's no text, don't render anything
  if (!text) return null;

  return (
    <DescriptionContainer>
      <TextContent
        ref={contentRef}
        $isExpanded={isExpanded}
        // If it contains actual HTML tags, use dangerouslySetInnerHTML
        // If it's just raw text with \n, you can just render it as a child.
        // We'll use dangerouslySetInnerHTML here just in case your backend sends a mix.
        dangerouslySetInnerHTML={{ __html: text }} 
      />
      
      {/* The gradient fade overlay that appears when text is collapsed */}
      {!isExpanded && isTruncated && <FadeOverlay />}

      {isTruncated && (
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>Show Less <ChevronUp size={16} /></>
          ) : (
            <>Read More <ChevronDown size={16} /></>
          )}
        </ToggleButton>
      )}
    </DescriptionContainer>
  );
};

// --- STYLED COMPONENTS ---

const DescriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextContent = styled.div`
  color: #d1d5db;
  line-height: 1.8;
  font-size: 1.05rem;
  
  /* CRITICAL: This property makes the browser respect the \n\n\n characters */
  white-space: pre-line; 

  /* Logic to clamp the text to a specific number of lines when collapsed */
  ${(props) =>
    !props.$isExpanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 6; /* Number of lines to show before clamping */
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}

  /* Style embedded HTML tags just in case */
  p { margin-bottom: 1rem; }
  strong { color: #fff; font-weight: 600; }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.7;
    -webkit-line-clamp: 8; /* Show slightly more lines on mobile */
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  bottom: 40px; /* Sit right above the Read More button */
  left: 0;
  width: 100%;
  height: 80px;
  /* Creates a smooth fade out to match your dark background (#0a0a0a) */
  background: linear-gradient(to bottom, rgba(10, 10, 10, 0), rgba(10, 10, 10, 1));
  pointer-events: none; /* Allows users to click text underneath if needed */
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  color: #ef4444; /* Your red accent color */
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fca5a5; /* Lighter red on hover */
  }

  /* Optional: Remove default focus outline and add a custom one */
  &:focus {
    outline: none;
  }
`;
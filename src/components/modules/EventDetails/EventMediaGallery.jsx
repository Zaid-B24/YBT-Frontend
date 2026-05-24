import { motion } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

export const EventMediaGallery = ({ event }) => {
  const [currentMedia, setCurrentMedia] = useState(null);

  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mediaGallery = useMemo(() => {

    const activeImages = isMobile && event?.imageUrlsMobile?.length > 0 
      ? event.imageUrlsMobile 
      : event?.imageUrls || [];

    // Same for videos
    const activeVideos = isMobile && event?.videoUrlsMobile?.length > 0 
      ? event.videoUrlsMobile 
      : event?.videoUrls || [];

    // Same for video thumbnail
    const videoPoster = isMobile && event?.mobileThumbnail 
      ? event.mobileThumbnail 
      : event?.thumbnail;


    const images = activeImages.map((url) => ({ type: "image", url, thumbnail: url }));
    const videos = activeVideos.map((url) => ({ type: "video", url, thumbnail: videoPoster }));
    return [...images, ...videos];
  }, [event, isMobile]);

  useEffect(() => {
    if (mediaGallery.length > 0) setCurrentMedia(mediaGallery[0]);
  }, [mediaGallery]);

  if (!currentMedia) return null;

  console.log(currentMedia.thumbnail, "this is thumbnail")

  return (
    <>
      <MediaContainer>
        {currentMedia.type === "image" ? (
          <DisplayedImage
            key={currentMedia.url}
            src={currentMedia.url}
            alt="Event gallery"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          />
        ) : (
          <DisplayedVideo
            key={currentMedia.url}
            src={currentMedia.url}
            poster={currentMedia.thumbnail}
            controls          
            autoPlay loop muted playsInline
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          />
        )}
      </MediaContainer>

      {mediaGallery.length > 0 && (
        <ThumbnailContainer>
          {mediaGallery.map((mediaItem, index) => (
            <Thumbnail
              key={index}
              isActive={currentMedia?.url === mediaItem.url}
              onClick={() => setCurrentMedia(mediaItem)}
            >
              <img src={mediaItem.thumbnail} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}
        </ThumbnailContainer>
      )}
    </>
  );
};

const MediaContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px; /* Slightly softer corners */
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08); /* Softer border */
  background-color: #111; /* Slightly lighter than pure black to reduce harsh contrast */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); /* Adds depth */
  
  /* Container for the motion elements */
  position: relative; 
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    border-radius: 12px;
    aspect-ratio: 9 / 16;
  }
`;

const DisplayedImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    object-fit: contain;  // prevents cropping on portrait images
  }
`;

const DisplayedVideo = styled(motion.video)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  
  
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem; /* Room for custom scrollbar if visible */
  
  /* Modern horizontal scrolling instead of wrapping */
  overflow-x: auto;
  scroll-behavior: smooth;
  
  /* Hide scrollbar for a cleaner look (optional but recommended for galleries) */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

export const Thumbnail = styled.div`
  width: 86px;
  height: 64px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0; /* Prevents squishing in the scrollable row */
  
  /* Visual cues for active vs inactive */
  opacity: ${(props) => (props.isActive ? "1" : "0.5")};
  border: 2px solid ${(props) => (props.isActive ? "#ef4444" : "transparent")};
  
  /* Smooth animations */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    opacity: 1;
    transform: ${(props) => (props.isActive ? "none" : "scale(1.05)")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    /* Prevents the image from flashing background color during load */
    background-color: #222; 
  }
`;
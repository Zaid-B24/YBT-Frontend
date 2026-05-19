import styled, { keyframes } from "styled-components";
import { EventHeader, InfoList } from "./EventSidebar";
import { EventLayout, LeftColumn, RightColumn } from "./EventDetailsView";
import { FacilitiesGrid, InfoBox } from "./EventDescription";
import { motion } from "framer-motion";
import { ThumbnailContainer } from "./EventMediaGallery";

export const EventDetailsSkeleton = () => (
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

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const DetailsCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 768px) {
    padding: 1.25rem; /* Reduced padding */
    gap: 1rem;
  }
`;

const LocationCard = styled(DetailsCard)``;

export const PageWrapper = styled.div`
  padding: 80px 1.5rem 2rem 1.5rem;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
`;

const SkeletonElement = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #1a1a1a 8%, #2a2a2a 18%, #1a1a1a 33%);
  background-size: 800px 104px;
  border-radius: 4px;
`;

const EventActions = styled.div`
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding-top: 1rem;
    margin-top: 0.5rem;
  }
`;

export const MainContent = styled(motion.div)``;
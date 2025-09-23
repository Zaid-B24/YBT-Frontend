import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  background-color: #2c2c2c; // A slightly darker background for the skeleton
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AnimatedBackground = styled.div`
  animation: ${shimmer} 1.2s linear infinite;
  background: linear-gradient(to right, #333 8%, #444 18%, #333 33%);
  background-size: 800px 104px;
  position: relative;
`;

export const SkeletonImage = styled(AnimatedBackground)`
  height: 200px;
  width: 100%;
`;

export const SkeletonContent = styled.div`
  padding: 1rem;
`;

export const SkeletonTitle = styled(AnimatedBackground)`
  height: 24px;
  width: 75%;
  margin-bottom: 0.75rem;
  border-radius: 4px;
`;

export const SkeletonSpecs = styled(AnimatedBackground)`
  height: 16px;
  width: 90%;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

export const SkeletonButton = styled(AnimatedBackground)`
  height: 40px;
  width: 50%;
  border-radius: 4px;
`;

export const CarCardSkeleton = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonTitle />
      <SkeletonSpecs />
      <SkeletonButton />
    </SkeletonContent>
  </SkeletonWrapper>
);

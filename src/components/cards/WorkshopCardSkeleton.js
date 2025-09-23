import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const SkeletonBase = styled.div`
  background: #1a1a1a;
  background-image: linear-gradient(
    to right,
    #1a1a1a 0%,
    #2c2c2c 20%,
    #1a1a1a 40%,
    #1a1a1a 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
`;

const SkeletonImage = styled(SkeletonBase)`
  height: 300px;
  width: 100%;
  position: relative; // Needed to position the icon
`;

const SkeletonIcon = styled(SkeletonBase)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const SkeletonText = styled(SkeletonBase)`
  height: 14px;
  margin-bottom: 0.5rem;
`;

const SkeletonStatNumber = styled(SkeletonBase)`
  height: 24px;
  width: 40px;
  margin: 0 auto 0.5rem;
`;

const SkeletonStatLabel = styled(SkeletonBase)`
  height: 12px;
  width: 60px;
  margin: 0 auto;
`;

const SkeletonButton = styled(SkeletonBase)`
  height: 45px;
  width: 100%;
  border-radius: 4px;
`;

const WorkshopCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const WorkshopContent = styled.div`
  padding: 2rem;
`;

const WorkshopStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

// --- Assembled Skeleton Component ---

export const WorkshopCardSkeleton = () => (
  <WorkshopCard as="div">
    {" "}
    {/* Use as="div" to avoid passing motion props */}
    <SkeletonImage>
      <SkeletonIcon />
    </SkeletonImage>
    <WorkshopContent>
      {/* Description Placeholder */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SkeletonText style={{ width: "90%" }} />
        <SkeletonText style={{ width: "95%" }} />
        <SkeletonText style={{ width: "85%" }} />
      </div>

      {/* Stats Placeholder */}
      <WorkshopStats>
        <Stat>
          <SkeletonStatNumber />
          <SkeletonStatLabel />
        </Stat>
        <Stat>
          <SkeletonStatNumber />
          <SkeletonStatLabel />
        </Stat>
        <Stat>
          <SkeletonStatNumber />
          <SkeletonStatLabel />
        </Stat>
      </WorkshopStats>

      {/* Button Placeholder */}
      <SkeletonButton />
    </WorkshopContent>
  </WorkshopCard>
);

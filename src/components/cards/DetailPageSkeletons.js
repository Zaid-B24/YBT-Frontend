import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

// --- Base Skeleton Styles ---
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

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProductsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// --- Product Card Skeleton ---
const SkeletonProductImage = styled(SkeletonBase)`
  height: 250px;
`;
const SkeletonProductTitle = styled(SkeletonBase)`
  height: 24px;
  width: 70%;
  margin-bottom: 0.5rem;
`;
const SkeletonProductPrice = styled(SkeletonBase)`
  height: 20px;
  width: 40%;
  margin-bottom: 1rem;
`;
const SkeletonProductButton = styled(SkeletonBase)`
  height: 16px;
  width: 50%;
`;
const ProductsSection = styled.section`
  padding: 4rem 2rem;
`;
const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;
const ProductContent = styled.div`
  padding: 1.5rem;
`;

export const ProductCardSkeleton = () => (
  <ProductCard as="div">
    <SkeletonProductImage />
    <ProductContent>
      <SkeletonProductTitle />
      <SkeletonProductPrice />
      <SkeletonProductButton />
    </ProductContent>
  </ProductCard>
);

// --- Full Designer Page Skeleton ---
const SkeletonDesignerImage = styled(SkeletonBase)`
  height: 400px;
  border-radius: 10px;
`;
const SkeletonDesignerName = styled(SkeletonBase)`
  height: 56px;
  width: 60%;
  margin-bottom: 1rem;
`;
const SkeletonDesignerTitle = styled(SkeletonBase)`
  height: 20px;
  width: 40%;
  margin-bottom: 2rem;
`;
const SkeletonText = styled(SkeletonBase)`
  height: 18px;
  margin-bottom: 0.75rem;
`;
const SkeletonMeta = styled(SkeletonBase)`
  height: 16px;
  width: 120px;
`;

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

export const DesignerPageSkeleton = () => (
  <PageWrapper>
    <HeroSection>
      <HeroContainer>
        <SkeletonDesignerImage />
        <div>
          <SkeletonDesignerName />
          <SkeletonDesignerTitle />
          <SkeletonText style={{ width: "90%" }} />
          <SkeletonText style={{ width: "95%" }} />
          <SkeletonText style={{ width: "85%", marginBottom: "2rem" }} />
          <div style={{ display: "flex", gap: "2rem" }}>
            <SkeletonMeta />
            <SkeletonMeta />
            <SkeletonMeta />
          </div>
        </div>
      </HeroContainer>
    </HeroSection>
    <ProductsSection>
      <SectionTitle>
        <SkeletonBase
          style={{ height: "40px", width: "300px", margin: "0 auto" }}
        />
      </SectionTitle>
      <ProductsGrid>
        {Array.from({ length: 3 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ProductsGrid>
    </ProductsSection>
  </PageWrapper>
);

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

// 2. Create a base animated placeholder
const SkeletonBase = styled.div`
  background: #1a1a1a;
  background-image: linear-gradient(to right, #1a1a1a 0%, #2c2c2c 20%, #1a1a1a 40%, #1a1a1a 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
`;

// 3. Create specific skeleton components for each visual block
const SkeletonMainImage = styled(SkeletonBase)`
  height: 80vh;
  border-radius: 10px;
`;

const SkeletonThumbnail = styled(SkeletonBase)`
  height: 100px;
  border-radius: 5px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 36px;
  width: 60%;
  margin-bottom: 0.5rem;
`;

const SkeletonSubtitle = styled(SkeletonBase)`
  height: 20px;
  width: 40%;
`;

const SkeletonButton = styled(SkeletonBase)`
  height: 48px;
  width: 180px;
  border-radius: 50px;
`;

const SkeletonText = styled(SkeletonBase)`
  height: 16px;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background-color: #0d0d0d;
  color: #f2f2f2;
`;

const FullWidthContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    padding: 0 1rem;
  }
`;



const VehicleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
`;



const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

// =================== Sections ===================
const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailsSection = styled.section`
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  &:first-of-type {
    border-top: none;
  }
`;

const VehicleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

// =================== Typography & Headings ===================
const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0;
`;



const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;



// =================== Specs & Features ===================
const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SpecItem = styled.div`
  background: #1a1a1a;
  border: 1px solid #292929;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;



const FeatureList = styled.ul`
  list-style: none;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.li`
  background-color: #1a1a1a;
  border: 1px solid #292929;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #d9d9d9;
`;

// =================== Rating & Location ===================



// 4. Assemble the final skeleton page component
export const VehicleInfoPageSkeleton = () => {
  return (
    <PageWrapper>
      <FullWidthContainer>
        <VehicleHeader>
          <MainContent>
            {/* Image Gallery Skeleton */}
            <ImageSection>
              <SkeletonMainImage />
              <ThumbnailGrid>
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonThumbnail key={i} />
                ))}
              </ThumbnailGrid>
            </ImageSection>

            {/* Title & Button Skeleton */}
            <VehicleInfo>
              <SkeletonTitle />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SkeletonSubtitle />
                <SkeletonButton />
              </div>
            </VehicleInfo>

            {/* Description Skeleton */}
            <DetailsSection>
              <SectionTitle style={{ marginBottom: '1rem' }}>About This Vehicle</SectionTitle>
              <SkeletonText style={{ width: '90%' }} />
              <SkeletonText style={{ width: '95%' }} />
              <SkeletonText style={{ width: '85%' }} />
            </DetailsSection>

            {/* Specs Skeleton */}
            <DetailsSection>
              <SectionTitle style={{ marginBottom: '1rem' }}>Specifications</SectionTitle>
              <SpecsGrid>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SpecItem key={i} style={{ height: '120px' }}>
                    <SkeletonBase style={{ width: '80%', height: '16px', margin: 'auto' }} />
                  </SpecItem>
                ))}
              </SpecsGrid>
            </DetailsSection>
            
            {/* Features Skeleton */}
            <DetailsSection>
                <SectionTitle style={{ marginBottom: '1rem' }}>Features & Amenities</SectionTitle>
                <FeatureList>
                    {Array.from({length: 6}).map((_, i) => (
                        <FeatureItem key={i}><SkeletonText style={{width: '100%'}}/></FeatureItem>
                    ))}
                </FeatureList>
            </DetailsSection>

          </MainContent>
        </VehicleHeader>
      </FullWidthContainer>
    </PageWrapper>
  );
};
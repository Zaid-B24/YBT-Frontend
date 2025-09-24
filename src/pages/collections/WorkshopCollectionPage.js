import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WorkshopCardSkeleton } from "../../components/cards/WorkshopCardSkeleton";

const fetchWorkshops = async () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/workshop`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch workshop");
  }
  return response.json();
};

const WorkshopCollectionPage = () => {
  const {
    data: workshops = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workshop"],
    queryFn: fetchWorkshops,
  });

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Custom Workshops</HeroTitle>
        <HeroSubtitle>
          Discover India's most skilled automotive workshops specializing in
          custom fabrication, restoration, and bespoke modifications for the
          ultimate personalized experience.
        </HeroSubtitle>
      </HeroSection>

      {isError && <p>Error: {error.message}</p>}

      {isLoading && (
        <WorkshopsGrid>
          <GridContainer>
            {Array.from({ length: 3 }).map((_, index) => (
              <WorkshopCardSkeleton key={index} />
            ))}
          </GridContainer>
        </WorkshopsGrid>
      )}

      {!isLoading && !isError && (
        <WorkshopsGrid>
          <GridContainer>
            {workshops.map((workshop, index) => (
              <WorkshopCard
                key={workshop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <WorkshopImage image={workshop.image}>
                  <WorkshopIcon>{workshop.icon}</WorkshopIcon>
                  <WorkshopOverlay>
                    <div>
                      <WorkshopTitle>{workshop.name}</WorkshopTitle>
                      <WorkshopSubtitle>{workshop.title}</WorkshopSubtitle>
                    </div>
                  </WorkshopOverlay>
                </WorkshopImage>
                <WorkshopContent>
                  <WorkshopDescription>
                    {workshop.description}
                  </WorkshopDescription>
                  <WorkshopStats>
                    <Stat>
                      <StatNumber>{workshop.stats.projects}</StatNumber>
                      <StatLabel>Projects</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>{workshop.stats.years}</StatNumber>
                      <StatLabel>Experience</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>{workshop.stats.specialists}</StatNumber>
                      <StatLabel>Specialists</StatLabel>
                    </Stat>
                  </WorkshopStats>
                  <ViewButton to={`/collections/workshop/${workshop.slug}`}>
                    View Workshop
                    <ArrowRight size={16} />
                  </ViewButton>
                </WorkshopContent>
              </WorkshopCard>
            ))}
          </GridContainer>
        </WorkshopsGrid>
      )}

      <FeaturedSection>
        <FeaturedContainer>
          <FeaturedTitle>Craftsmanship Excellence</FeaturedTitle>
          <FeaturedText>
            Our custom workshops represent the pinnacle of automotive
            craftsmanship in India. Each workshop specializes in different
            aspects of vehicle customization, from precision fabrication to
            luxury interior work. Our skilled artisans and engineers combine
            traditional techniques with modern technology to create truly unique
            automotive experiences. Whether you're looking for a complete
            restoration, performance enhancement, or bespoke modification, our
            workshops deliver unparalleled quality and attention to detail.
          </FeaturedText>
        </FeaturedContainer>
      </FeaturedSection>
    </PageWrapper>
  );
};

export default WorkshopCollectionPage;

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const WorkshopsGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WorkshopCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
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

const WorkshopImage = styled.div`
  height: 300px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const WorkshopOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const WorkshopIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const WorkshopContent = styled.div`
  padding: 2rem;
`;

const WorkshopTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const WorkshopSubtitle = styled.h4`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const WorkshopDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const WorkshopStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
  }
`;

const FeaturedSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FeaturedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturedTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const FeaturedText = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
`;

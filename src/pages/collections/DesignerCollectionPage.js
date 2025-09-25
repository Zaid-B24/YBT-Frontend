import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DesignerCardSkeleton } from "../../components/cards/DesignerCardSkeleton";
import { ArrowRight, Award, Briefcase, Calendar } from "lucide-react";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 1rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  margin-bottom: 0.5rem;

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

const DesignersGrid = styled.div`
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
  opacity: 0; /* Hidden by default */
  transform: translateY(10px); /* Start 10px lower */
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
    color: #b8860b;
  }
`;

const DesignerCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  height: 550px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: radial-gradient(
      600px circle at var(--x) var(--y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
  }

  &:hover:before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  &:hover ${ViewButton} {
    opacity: 1; /* Make it visible */
    transform: translateY(0); /* Move it back to its original position */
  }
`;

const DesignerImage = styled.div`
  height: 300px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const DesignerOverlay = styled.div`
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

const DesignerContent = styled.div`
  padding: 2rem;
`;

const DesignerTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const DesignerSubtitle = styled.h4`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DesignerDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DesignerStats = styled.div`
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
  color: #b8860b;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

const fetchDesigners = async () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/designer`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch designers");
  }
  return response.json();
};

const DesignerCollectionPage = () => {
  const {
    data: designers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["designers"],
    queryFn: fetchDesigners,
  });

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Designer Collection</HeroTitle>
        <HeroSubtitle>
          Discover India's finest automotive designers and their exceptional
          creations. Each designer brings their unique vision and expertise to
          create automotive masterpieces.
        </HeroSubtitle>
      </HeroSection>

      {isError && <p>Error: {error.message}</p>}
      {isLoading && (
        <DesignersGrid>
          <GridContainer>
            {/* Render 3 skeletons as placeholders */}
            {Array.from({ length: 3 }).map((_, index) => (
              <DesignerCardSkeleton key={index} />
            ))}
          </GridContainer>
        </DesignersGrid>
      )}

      {!isLoading && !isError && (
        <DesignersGrid>
          <GridContainer>
            {designers.map((designer, index) => (
              <DesignerCard
                key={designer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              >
                <DesignerImage image={designer.image}>
                  {/* <DesignerIcon>{designer.icon}</DesignerIcon> */}
                  <DesignerOverlay>
                    <div>
                      <DesignerTitle>{designer.name}</DesignerTitle>
                      <DesignerSubtitle>{designer.title}</DesignerSubtitle>
                    </div>
                  </DesignerOverlay>
                </DesignerImage>
                <DesignerContent>
                  <DesignerDescription>
                    {designer.description}
                  </DesignerDescription>
                  <DesignerStats>
                    <Stat>
                      <StatNumber>
                        <Briefcase size={20} /> {designer.stats.projects}
                      </StatNumber>
                      <StatLabel>Projects</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>
                        <Calendar size={20} /> {designer.stats.experience}
                      </StatNumber>
                      <StatLabel>Experience</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>
                        <Award size={20} /> {designer.stats.awards}
                      </StatNumber>
                      <StatLabel>Awards</StatLabel>
                    </Stat>
                  </DesignerStats>
                  <ViewButton to={`/collections/designer/${designer.slug}`}>
                    View Designer
                    <ArrowRight size={16} />
                  </ViewButton>
                </DesignerContent>
              </DesignerCard>
            ))}
          </GridContainer>
        </DesignersGrid>
      )}

      <FeaturedSection>
        <FeaturedContainer>
          <FeaturedTitle>Crafting Automotive Excellence</FeaturedTitle>
          <FeaturedText>
            Our designer collection features India's most talented automotive
            designers who have dedicated their careers to pushing the boundaries
            of automotive design. Each designer brings their unique perspective,
            combining traditional craftsmanship with modern innovation to create
            vehicles that are not just modes of transportation, but works of
            art. From luxury modifications to performance enhancements, these
            designers represent the pinnacle of automotive creativity and
            engineering excellence.
          </FeaturedText>
        </FeaturedContainer>
      </FeaturedSection>
    </PageWrapper>
  );
};

export default DesignerCollectionPage;

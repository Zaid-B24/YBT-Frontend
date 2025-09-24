import styled from "styled-components";
import { motion } from "framer-motion";
import { collections, stats } from "../../data/collectionspageData";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  color: #fff;
`;

const HeroSection = styled.section`
  padding: 2rem 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
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
  margin: 0 auto 1rem;
`;

const CollectionsGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

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
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CollectionImage = styled.div`
  height: 300px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const CollectionOverlay = styled.div`
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

const CollectionIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
`;

const CollectionContent = styled.div`
  padding: 2rem;
`;

const CollectionTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const CollectionSubtitle = styled.h4`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CollectionDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CollectionFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const Feature = styled.li`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: #666;
  }
`;

const StatsSection = styled.div`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const StatNumber = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
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

const CollectionsPage = () => {
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
        <HeroTitle>Collections</HeroTitle>
        <HeroSubtitle>
          Explore our curated collections of automotive excellence, each
          designed to elevate your driving experience to extraordinary heights.
        </HeroSubtitle>
      </HeroSection>

      <CollectionsGrid>
        <GridContainer>
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              <CollectionImage image={collection.image}>
                <CollectionIcon>{collection.icon}</CollectionIcon>
                <CollectionOverlay>
                  <div>
                    <CollectionTitle>{collection.title}</CollectionTitle>
                    <CollectionSubtitle>
                      {collection.subtitle}
                    </CollectionSubtitle>
                  </div>
                </CollectionOverlay>
              </CollectionImage>
              <CollectionContent>
                <CollectionDescription>
                  {collection.description}
                </CollectionDescription>
                <CollectionFeatures>
                  {collection.features.map((feature, idx) => (
                    <Feature key={idx}>{feature}</Feature>
                  ))}
                </CollectionFeatures>
                <ViewButton to={collection.route}>
                  Explore Collection
                  <ArrowRight size={16} />
                </ViewButton>
              </CollectionContent>
            </CollectionCard>
          ))}
        </GridContainer>
      </CollectionsGrid>

      <StatsSection>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>
    </PageWrapper>
  );
};

export default CollectionsPage;

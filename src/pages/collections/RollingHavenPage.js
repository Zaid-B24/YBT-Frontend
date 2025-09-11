import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, MapPin, Star, Truck } from 'lucide-react';

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
  font-family: 'Playfair Display', serif;
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

const ManufacturersGrid = styled.div`
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

const ManufacturerCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
`;

const ManufacturerImage = styled.div`
  height: 300px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const ManufacturerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const ManufacturerIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const ManufacturerContent = styled.div`
  padding: 2rem;
`;

const ManufacturerTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ManufacturerSubtitle = styled.h4`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ManufacturerDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ManufacturerStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
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
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const FeaturedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturedTitle = styled.h2`
  font-family: 'Playfair Display', serif;
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

const RollingHavenPage = () => {
  const manufacturers = [
    {
      id: 1,
      name: "Luxury Nomad",
      title: "Premium Motorhome Specialists",
      description: "Crafting the finest luxury motorhomes with state-of-the-art amenities and premium finishes for the discerning traveler.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Home size={24} />,
      stats: {
        models: "25+",
        years: "12+",
        clients: "500+"
      }
    },
    {
      id: 2,
      name: "Wanderlust Caravans",
      title: "Adventure Travel Solutions",
      description: "Designing innovative caravans that combine comfort with adventure, perfect for exploring India's diverse landscapes.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <MapPin size={24} />,
      stats: {
        models: "35+",
        years: "15+",
        clients: "750+"
      }
    },
    {
      id: 3,
      name: "Elite Mobile Homes",
      title: "Luxury Living on Wheels",
      description: "Creating mobile homes that redefine luxury travel, featuring premium interiors and cutting-edge technology.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Star size={24} />,
      stats: {
        models: "20+",
        years: "8+",
        clients: "300+"
      }
    },
    {
      id: 4,
      name: "Expedition Rigs",
      title: "Off-Road Adventure Vehicles",
      description: "Specialized in rugged expedition vehicles built for off-road adventures and extended wilderness expeditions.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Truck size={24} />,
      stats: {
        models: "15+",
        years: "10+",
        clients: "200+"
      }
    },
    {
      id: 5,
      name: "Comfort Cruisers",
      title: "Family Travel Specialists",
      description: "Designing family-friendly caravans and motorhomes with spacious layouts and child-safe features for memorable family adventures.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Home size={24} />,
      stats: {
        models: "30+",
        years: "18+",
        clients: "900+"
      }
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Rolling Haven</HeroTitle>
        <HeroSubtitle>
          Discover India's finest caravan and motorhome manufacturers. 
          Each brand specializes in creating luxury travel experiences on wheels.
        </HeroSubtitle>
      </HeroSection>

      <ManufacturersGrid>
        <GridContainer>
          {manufacturers.map((manufacturer, index) => (
            <ManufacturerCard
              key={manufacturer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ManufacturerImage image={manufacturer.image}>
                <ManufacturerIcon>{manufacturer.icon}</ManufacturerIcon>
                <ManufacturerOverlay>
                  <div>
                    <ManufacturerTitle>{manufacturer.name}</ManufacturerTitle>
                    <ManufacturerSubtitle>{manufacturer.title}</ManufacturerSubtitle>
                  </div>
                </ManufacturerOverlay>
              </ManufacturerImage>
              <ManufacturerContent>
                <ManufacturerDescription>{manufacturer.description}</ManufacturerDescription>
                <ManufacturerStats>
                  <Stat>
                    <StatNumber>{manufacturer.stats.models}</StatNumber>
                    <StatLabel>Models</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{manufacturer.stats.years}</StatNumber>
                    <StatLabel>Experience</StatLabel>
                  </Stat>
                  <Stat>
                    <StatNumber>{manufacturer.stats.clients}</StatNumber>
                    <StatLabel>Happy Clients</StatLabel>
                  </Stat>
                </ManufacturerStats>
                <ViewButton to={`/collections/${manufacturer.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  View Collection
                  <ArrowRight size={16} />
                </ViewButton>
              </ManufacturerContent>
            </ManufacturerCard>
          ))}
        </GridContainer>
      </ManufacturersGrid>

      <FeaturedSection>
        <FeaturedContainer>
          <FeaturedTitle>Your Home Away From Home</FeaturedTitle>
          <FeaturedText>
            Rolling Haven brings together India's most trusted caravan and motorhome manufacturers who have mastered 
            the art of creating luxury travel experiences. Whether you're seeking a weekend getaway vehicle or a 
            full-time mobile home, our collection offers something for every adventurer. From compact caravans perfect 
            for couples to spacious motorhomes designed for families, each vehicle is crafted with attention to detail, 
            comfort, and durability. Experience the freedom of the open road without compromising on luxury and comfort.
          </FeaturedText>
        </FeaturedContainer>
      </FeaturedSection>
    </PageWrapper>
  );
};

export default RollingHavenPage; 
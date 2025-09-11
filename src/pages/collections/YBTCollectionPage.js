import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Car, Bike, ArrowRight } from 'lucide-react';

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

const VehicleTypeSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const VehicleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const VehicleCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  height: 400px;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(255,255,255,0.3);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
`;

const VehicleImage = styled.div`
  height: 60%;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const VehicleIcon = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 1rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const VehicleContent = styled.div`
  padding: 2rem;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VehicleTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const VehicleDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    gap: 1rem;
    transform: translateX(5px);
  }
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const StatsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled(motion.div)`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const YBTCollectionPage = () => {
  const vehicleTypes = [
    {
      id: 'cars',
      title: 'Cars',
      description: 'Explore our exclusive collection of luxury cars featuring signature YBT modifications, performance upgrades, and bespoke styling.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      icon: <Car size={32} />,
      link: '/collections/ybt-cars'
    },
    {
      id: 'bikes',
      title: 'Bikes',
      description: 'Discover our premium motorcycle collection with custom modifications, performance enhancements, and unique design elements.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      icon: <Bike size={32} />,
      link: '/collections/ybt-bikes'
    }
  ];

  const stats = [
    { number: "50+", label: "Exclusive Models" },
    { number: "500+", label: "Vehicles Modified" },
    { number: "15+", label: "Years Heritage" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>YBT Collection</HeroTitle>
        <HeroSubtitle>
          Our signature collection featuring the finest automobiles and motorcycles, 
          each bearing the distinctive YOUNG BOY TOYZ mark of excellence.
        </HeroSubtitle>
      </HeroSection>

      <VehicleTypeSection>
        <SectionTitle>Choose Your Journey</SectionTitle>
        <VehicleGrid>
          {vehicleTypes.map((type, index) => (
            <VehicleCard
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <VehicleImage image={type.image}>
                <VehicleIcon>{type.icon}</VehicleIcon>
              </VehicleImage>
              <VehicleContent>
                <div>
                  <VehicleTitle>{type.title}</VehicleTitle>
                  <VehicleDescription>{type.description}</VehicleDescription>
                </div>
                <ExploreButton to={type.link}>
                  Explore {type.title}
                  <ArrowRight size={16} />
                </ExploreButton>
              </VehicleContent>
            </VehicleCard>
          ))}
        </VehicleGrid>
      </VehicleTypeSection>

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

export default YBTCollectionPage; 
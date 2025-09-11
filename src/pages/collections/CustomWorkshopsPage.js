import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Settings, Cog } from 'lucide-react';

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

const WorkshopImage = styled.div`
  height: 300px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const WorkshopOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const WorkshopIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const WorkshopContent = styled.div`
  padding: 2rem;
`;

const WorkshopTitle = styled.h3`
  font-family: 'Playfair Display', serif;
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

const CustomWorkshopsPage = () => {
  const workshops = [
    {
      id: 1,
      name: "Precision Craft Workshop",
      title: "Custom Fabrication Specialists",
      description: "Masters of bespoke automotive fabrication, creating one-of-a-kind components and modifications with precision engineering and artistic vision.",
      image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Wrench size={24} />,
      stats: {
        projects: "200+",
        years: "12+",
        specialists: "15+"
      }
    },
    {
      id: 2,
      name: "Heritage Restoration Works",
      title: "Classic Car Restoration",
      description: "Dedicated to preserving automotive history through meticulous restoration of classic and vintage vehicles to their original glory.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      icon: <Settings size={24} />,
      stats: {
        projects: "150+",
        years: "20+",
        specialists: "12+"
      }
    },
    {
      id: 3,
      name: "Performance Dynamics Lab",
      title: "Engine & Drivetrain Specialists",
      description: "Advanced engineering workshop specializing in engine rebuilds, performance modifications, and drivetrain optimization for maximum power output.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Cog size={24} />,
      stats: {
        projects: "300+",
        years: "8+",
        specialists: "18+"
      }
    },
    {
      id: 4,
      name: "Artisan Interiors Studio",
      title: "Luxury Interior Specialists",
      description: "Creating bespoke automotive interiors with premium materials, custom upholstery, and handcrafted details for discerning clients.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Wrench size={24} />,
      stats: {
        projects: "180+",
        years: "10+",
        specialists: "10+"
      }
    },
    {
      id: 5,
      name: "Aero Dynamics Workshop",
      title: "Aerodynamic & Body Specialists",
      description: "Specialized in aerodynamic enhancements, body modifications, and carbon fiber work for improved performance and aesthetics.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Wrench size={24} />,
      stats: {
        projects: "120+",
        years: "6+",
        specialists: "8+"
      }
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Custom Workshops</HeroTitle>
        <HeroSubtitle>
          Discover India's most skilled automotive workshops specializing in custom fabrication, 
          restoration, and bespoke modifications for the ultimate personalized experience.
        </HeroSubtitle>
      </HeroSection>

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
                <WorkshopDescription>{workshop.description}</WorkshopDescription>
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
                <ViewButton to={`/collections/${workshop.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  View Workshop
                  <ArrowRight size={16} />
                </ViewButton>
              </WorkshopContent>
            </WorkshopCard>
          ))}
        </GridContainer>
      </WorkshopsGrid>

      <FeaturedSection>
        <FeaturedContainer>
          <FeaturedTitle>Craftsmanship Excellence</FeaturedTitle>
          <FeaturedText>
            Our custom workshops represent the pinnacle of automotive craftsmanship in India. Each workshop 
            specializes in different aspects of vehicle customization, from precision fabrication to luxury 
            interior work. Our skilled artisans and engineers combine traditional techniques with modern 
            technology to create truly unique automotive experiences. Whether you're looking for a complete 
            restoration, performance enhancement, or bespoke modification, our workshops deliver unparalleled 
            quality and attention to detail.
          </FeaturedText>
        </FeaturedContainer>
      </FeaturedSection>
    </PageWrapper>
  );
};

export default CustomWorkshopsPage; 
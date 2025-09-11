import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Calendar, MapPin, Users, Heart, ShoppingCart } from 'lucide-react';

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

const WorkshopImage = styled.div`
  height: 400px;
  background: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80') center center/cover no-repeat;
  border-radius: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.3), transparent);
    border-radius: 10px;
  }
`;

const WorkshopInfo = styled.div``;

const WorkshopName = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WorkshopTitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const WorkshopDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const WorkshopMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const ServicesSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ServicesTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.2);
  }
`;

const ServiceIcon = styled.div`
  color: #d4af37;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const ServiceTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const ServiceDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #d4af37;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProjectsGrid = styled.div`
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

const ProjectCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.2);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
`;

const ProjectImage = styled.div`
  height: 250px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const ProjectBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(212,175,55,0.9);
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(0,0,0,0.8);
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.1);
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProjectSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const ProjectPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #d4af37;
  margin-bottom: 1rem;
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

const HeritageRestorationPage = () => {
  const services = [
    {
      icon: <Settings size={24} />,
      title: "Complete Restoration",
      description: "Full vehicle restoration to original specifications using authentic parts and traditional techniques."
    },
    {
      icon: <Settings size={24} />,
      title: "Engine Rebuilding",
      description: "Expert engine rebuilding and restoration maintaining original performance characteristics."
    },
    {
      icon: <Settings size={24} />,
      title: "Bodywork & Paint",
      description: "Meticulous bodywork restoration and authentic paint matching for period-correct finishes."
    },
    {
      icon: <Settings size={24} />,
      title: "Interior Restoration",
      description: "Authentic interior restoration using period-appropriate materials and craftsmanship techniques."
    }
  ];

  const stats = [
    { number: "150+", label: "Restorations" },
    { number: "20+", label: "Years Experience" },
    { number: "12+", label: "Master Craftsmen" },
    { number: "98%", label: "Authenticity Rating" }
  ];

  const projects = [
    {
      id: 1,
      title: "1967 Shelby Cobra 427",
      price: "₹2,50,00,000",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      specs: ["7.0L V8", "425 HP", "Restored"],
      badge: "Completed"
    },
    {
      id: 2,
      title: "1955 Mercedes 300SL Gullwing",
      price: "₹4,20,00,000",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["3.0L I6", "215 HP", "Concours"],
      badge: "Completed"
    },
    {
      id: 3,
      title: "1963 Jaguar E-Type",
      price: "₹1,80,00,000",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["3.8L I6", "265 HP", "Restored"],
      badge: "Completed"
    },
    {
      id: 4,
      title: "1970 Porsche 911S",
      price: "₹1,50,00,000",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["2.2L H6", "180 HP", "Restored"],
      badge: "Completed"
    },
    {
      id: 5,
      title: "1969 Chevrolet Camaro SS",
      price: "₹95,00,000",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["6.5L V8", "375 HP", "Restored"],
      badge: "Completed"
    },
    {
      id: 6,
      title: "1957 Ferrari 250 GT",
      price: "₹8,50,00,000",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["3.0L V12", "240 HP", "Concours"],
      badge: "Museum Quality"
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContainer>
          <WorkshopImage />
          <WorkshopInfo>
            <WorkshopName>Heritage Restoration Works</WorkshopName>
            <WorkshopTitle>Classic Car Restoration</WorkshopTitle>
            <WorkshopDescription>
              Established in 2003, Heritage Restoration Works is dedicated to preserving automotive history through 
              meticulous restoration of classic and vintage vehicles. Our master craftsmen combine traditional 
              techniques with modern precision to bring legendary automobiles back to their original glory. We 
              specialize in concours-level restorations that maintain historical authenticity while ensuring 
              reliability for the modern era.
            </WorkshopDescription>
            <WorkshopMeta>
              <MetaItem>
                <Calendar size={16} />
                <span>Established 2003</span>
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />
                <span>Chennai, India</span>
              </MetaItem>
              <MetaItem>
                <Users size={16} />
                <span>12+ Master Craftsmen</span>
              </MetaItem>
            </WorkshopMeta>
          </WorkshopInfo>
        </HeroContainer>
      </HeroSection>

      <ServicesSection>
        <ServicesContainer>
          <ServicesTitle>Our Services</ServicesTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>

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

      <ProjectsSection>
        <SectionTitle>Featured Restorations</SectionTitle>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectImage image={project.image}>
                <ProjectBadge>{project.badge}</ProjectBadge>
                <ProjectActions>
                  <ActionButton>
                    <Heart size={16} />
                  </ActionButton>
                  <ActionButton>
                    <ShoppingCart size={16} />
                  </ActionButton>
                </ProjectActions>
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectSpecs>
                  {project.specs.map((spec, idx) => (
                    <span key={idx}>{spec}</span>
                  ))}
                </ProjectSpecs>
                <ProjectPrice>{project.price}</ProjectPrice>
                <ViewButton to={`/cars/${project.id}`}>
                  View Details
                  <ArrowRight size={16} />
                </ViewButton>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsSection>
    </PageWrapper>
  );
};

export default HeritageRestorationPage; 
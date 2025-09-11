import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Calendar, MapPin, Users, Heart, ShoppingCart } from 'lucide-react';

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
  background: url('https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center center/cover no-repeat;
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

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const ServiceIcon = styled.div`
  background: rgba(255,255,255,0.1);
  color: #fff;
  padding: 1rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
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
  color: #fff;
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
  background: rgba(0,0,0,0.8);
  color: #fff;
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

const ProjectDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
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

const PrecisionCraftWorkshopPage = () => {
  const services = [
    {
      icon: <Wrench size={24} />,
      title: "Custom Fabrication",
      description: "Precision metal work and custom component fabrication using state-of-the-art machinery and traditional craftsmanship techniques."
    },
    {
      icon: <Wrench size={24} />,
      title: "Body Kit Design",
      description: "Bespoke body kit design and manufacturing, creating unique aerodynamic enhancements and aesthetic modifications."
    },
    {
      icon: <Wrench size={24} />,
      title: "Chassis Modifications",
      description: "Expert chassis reinforcement and modification services for improved performance and safety standards."
    },
    {
      icon: <Wrench size={24} />,
      title: "Suspension Tuning",
      description: "Advanced suspension setup and tuning for optimal handling characteristics and ride quality."
    }
  ];

  const stats = [
    { number: "200+", label: "Projects Completed" },
    { number: "12+", label: "Years Experience" },
    { number: "15+", label: "Expert Craftsmen" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const projects = [
    {
      id: 1,
      title: "Custom BMW M3 Wide Body",
      description: "Complete wide body transformation with custom fender flares, side skirts, and aerodynamic enhancements.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badge: "Wide Body"
    },
    {
      id: 2,
      title: "Vintage Mustang Restoration",
      description: "Frame-off restoration with custom chassis modifications and modern performance upgrades.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      badge: "Restoration"
    },
    {
      id: 3,
      title: "Porsche 911 Track Build",
      description: "Race-spec modifications including roll cage fabrication, weight reduction, and aerodynamic package.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badge: "Track Build"
    },
    {
      id: 4,
      title: "Custom Jeep Off-Road Build",
      description: "Extreme off-road modifications with custom bumpers, rock sliders, and suspension upgrades.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badge: "Off-Road"
    },
    {
      id: 5,
      title: "McLaren Aero Package",
      description: "Custom carbon fiber aerodynamic package with front splitter, rear wing, and side skirts.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badge: "Aero Package"
    },
    {
      id: 6,
      title: "Custom Motorcycle Frame",
      description: "Bespoke motorcycle frame fabrication with integrated fuel tank and custom geometry.",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badge: "Motorcycle"
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContainer>
          <WorkshopImage />
          <WorkshopInfo>
            <WorkshopName>Precision Craft Workshop</WorkshopName>
            <WorkshopTitle>Custom Fabrication Specialists</WorkshopTitle>
            <WorkshopDescription>
              Established in 2011, Precision Craft Workshop has become synonymous with excellence in automotive 
              fabrication and custom modifications. Our team of master craftsmen combines traditional metalworking 
              techniques with cutting-edge technology to create bespoke automotive components that exceed expectations. 
              From concept to completion, we deliver precision-engineered solutions for discerning automotive enthusiasts.
            </WorkshopDescription>
            <WorkshopMeta>
              <MetaItem>
                <Calendar size={16} />
                <span>Established 2011</span>
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />
                <span>Bangalore, India</span>
              </MetaItem>
              <MetaItem>
                <Users size={16} />
                <span>15+ Specialists</span>
              </MetaItem>
            </WorkshopMeta>
          </WorkshopInfo>
        </HeroContainer>
      </HeroSection>

      <ServicesSection>
        <ServicesContainer>
          <SectionTitle>Our Specialized Services</SectionTitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
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
        <SectionTitle>Featured Projects</SectionTitle>
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
                <ProjectDescription>{project.description}</ProjectDescription>
                <ViewButton to={`/project/${project.id}`}>
                  View Project
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

export default PrecisionCraftWorkshopPage; 
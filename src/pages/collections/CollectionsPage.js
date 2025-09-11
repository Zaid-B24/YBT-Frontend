import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.2);
  }
`;

const CollectionImage = styled.div`
  height: 300px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const CollectionOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
`;

const CollectionIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 0.8rem;
  border-radius: 50%;
`;

const CollectionContent = styled.div`
  padding: 2rem;
`;

const CollectionTitle = styled.h3`
  font-family: 'Playfair Display', serif;
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
    content: '→';
    position: absolute;
    left: 0;
    color: #666;
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
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
  }
`;

const StatsSection = styled.div`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
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
  font-family: 'Playfair Display', serif;
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

const CollectionsPage = () => {
  const collections = [
    {
      id: 1,
      title: "YBT Collection",
      subtitle: "Signature Automotive Excellence",
      description: "Our flagship collection featuring exclusive cars and bikes with YOUNG BOY TOYZ signature modifications and luxury enhancements.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Star size={24} />,
      route: "/collections/ybt",
      features: [
        "Signature YBT modifications",
        "Exclusive cars and bikes",
        "Premium customizations",
        "Limited edition designs",
        "Luxury performance upgrades"
      ]
    },
    {
      id: 2,
      title: "Designer Collection",
      subtitle: "Curated by Master Craftsmen",
      description: "Exclusive designs by India's top automotive designers, featuring unique styling and bespoke modifications.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/designer",
      features: [
        "Top Indian designers",
        "Bespoke styling solutions",
        "Unique design concepts",
        "Artistic modifications",
        "Designer signature series"
      ]
    },
    {
      id: 3,
      title: "Torque Tuner Edition",
      subtitle: "Performance Engineering Excellence",
      description: "High-performance modifications focused on power, torque, and dynamic driving experience with cutting-edge technology.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      icon: <Zap size={24} />,
      route: "/collections/torque-tuner",
      features: [
        "Performance tuning",
        "Engine modifications",
        "Turbo & supercharger upgrades",
        "Sport suspension systems",
        "Racing-grade components"
      ]
    },
    {
      id: 4,
      title: "Custom Workshops",
      subtitle: "Tailored Automotive Solutions",
      description: "Specialized workshops offering custom fabrication, restoration, and unique modification services for discerning clients.",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/custom-workshops",
      features: [
        "Custom fabrication",
        "Restoration services",
        "Specialized workshops",
        "Unique modifications",
        "Bespoke solutions"
      ]
    },
    {
      id: 5,
      title: "Rolling Haven",
      subtitle: "Luxury Travel Experiences",
      description: "Premium caravans and motorhomes designed for luxury travel, featuring state-of-the-art amenities and comfort.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Star size={24} />,
      route: "/collections/rolling-haven",
      features: [
        "Luxury caravans",
        "Premium motorhomes",
        "Travel comfort solutions",
        "State-of-the-art amenities",
        "Custom interior designs"
      ]
    },
    {
      id: 6,
      title: "GS Designs",
      subtitle: "Automotive Design Studio",
      description: "Founded in 2008, GS Designs has established itself as one of India's premier automotive design studios, specializing in bespoke luxury vehicles.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/gs-designs",
      features: [
        "Bespoke luxury vehicles",
        "Cutting-edge technology",
        "Timeless elegance",
        "Custom design solutions",
        "Premium craftsmanship"
      ]
    },
    {
      id: 7,
      title: "DC Designs",
      subtitle: "Custom Automotive Solutions",
      description: "Established in 2003, DC Designs has revolutionized the Indian automotive design landscape with bold, innovative modifications.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/dc-designs",
      features: [
        "Bold body kits",
        "Custom interiors",
        "Performance enhancements",
        "Unique modifications",
        "Innovative designs"
      ]
    },
    {
      id: 8,
      title: "Motormind Designs",
      subtitle: "Performance & Aesthetics",
      description: "Founded in 2013, Motormind Designs specializes in combining cutting-edge technology with artistic vision for high-performance modifications.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Zap size={24} />,
      route: "/collections/motormind-designs",
      features: [
        "High-performance modifications",
        "Cutting-edge technology",
        "Artistic vision",
        "Power enhancements",
        "Visual appeal"
      ]
    },
    {
      id: 9,
      title: "Heritage Restoration",
      subtitle: "Classic Automotive Preservation",
      description: "Specializing in the restoration and preservation of classic and vintage automobiles, bringing automotive history back to life.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/heritage-restoration",
      features: [
        "Classic car restoration",
        "Vintage preservation",
        "Historical accuracy",
        "Authentic parts",
        "Heritage maintenance"
      ]
    },
    {
      id: 10,
      title: "Luxury Nomad",
      subtitle: "Premium Travel Solutions",
      description: "Luxury motorhomes and travel vehicles designed for the ultimate nomadic lifestyle with premium amenities and comfort.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Star size={24} />,
      route: "/collections/luxury-nomad",
      features: [
        "Luxury motorhomes",
        "Premium amenities",
        "Travel comfort",
        "Nomadic lifestyle",
        "High-end interiors"
      ]
    },
    {
      id: 11,
      title: "Precision Craft Workshop",
      subtitle: "Masterful Automotive Artistry",
      description: "Precision engineering and masterful craftsmanship combine to create automotive works of art with unparalleled attention to detail.",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Award size={24} />,
      route: "/collections/precision-craft",
      features: [
        "Precision engineering",
        "Masterful craftsmanship",
        "Attention to detail",
        "Automotive artistry",
        "Quality excellence"
      ]
    },
    {
      id: 12,
      title: "Velocity Customs",
      subtitle: "Speed & Style Fusion",
      description: "Where speed meets style - creating high-performance vehicles with stunning aesthetics and cutting-edge modifications.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      icon: <Zap size={24} />,
      route: "/collections/velocity-customs",
      features: [
        "High-performance vehicles",
        "Speed optimization",
        "Style fusion",
        "Cutting-edge mods",
        "Aesthetic excellence"
      ]
    },
    {
      id: 13,
      title: "Wanderlust Caravans",
      subtitle: "Adventure Travel Specialists",
      description: "Specialized caravans and travel vehicles designed for adventure seekers who demand comfort and reliability on their journeys.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: <Star size={24} />,
      route: "/collections/wanderlust-caravans",
      features: [
        "Adventure caravans",
        "Travel reliability",
        "Comfort design",
        "Journey optimization",
        "Exploration ready"
      ]
    }
  ];

  const stats = [
    { number: "13+", label: "Unique Collections" },
    { number: "1000+", label: "Vehicles Modified" },
    { number: "25+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Collections</HeroTitle>
        <HeroSubtitle>
          Explore our curated collections of automotive excellence, each designed to 
          elevate your driving experience to extraordinary heights.
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
            >
              <CollectionImage image={collection.image}>
                <CollectionIcon>{collection.icon}</CollectionIcon>
                <CollectionOverlay>
                  <div>
                    <CollectionTitle>{collection.title}</CollectionTitle>
                    <CollectionSubtitle>{collection.subtitle}</CollectionSubtitle>
                  </div>
                </CollectionOverlay>
              </CollectionImage>
              <CollectionContent>
                <CollectionDescription>{collection.description}</CollectionDescription>
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
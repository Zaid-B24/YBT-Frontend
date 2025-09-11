import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users, Heart, ShoppingCart } from 'lucide-react';

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

const ManufacturerImage = styled.div`
  height: 400px;
  background: url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center center/cover no-repeat;
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

const ManufacturerInfo = styled.div``;

const ManufacturerName = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ManufacturerTitle = styled.h2`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ManufacturerDescription = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ManufacturerMeta = styled.div`
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

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.1);
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

const ProductsSection = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProductsGrid = styled.div`
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

const ProductCard = styled(motion.div)`
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

const ProductImage = styled.div`
  height: 250px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'} center center/cover no-repeat;
  position: relative;
`;

const ProductBadge = styled.div`
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

const ProductActions = styled.div`
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

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ProductSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
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

const LuxuryNomadPage = () => {
  const stats = [
    { number: "25+", label: "Luxury Models" },
    { number: "12+", label: "Years Experience" },
    { number: "500+", label: "Happy Clients" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  const products = [
    {
      id: 1,
      title: "Luxury Nomad Elite 45",
      price: "₹2,50,00,000",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["45 ft Length", "6 Berths", "Diesel"],
      badge: "Elite Series"
    },
    {
      id: 2,
      title: "Luxury Nomad Presidential 50",
      price: "₹3,80,00,000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["50 ft Length", "8 Berths", "Diesel"],
      badge: "Presidential"
    },
    {
      id: 3,
      title: "Luxury Nomad Compact 35",
      price: "₹1,80,00,000",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["35 ft Length", "4 Berths", "Diesel"],
      badge: "Compact Luxury"
    },
    {
      id: 4,
      title: "Luxury Nomad Explorer 40",
      price: "₹2,20,00,000",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["40 ft Length", "5 Berths", "Diesel"],
      badge: "Explorer"
    },
    {
      id: 5,
      title: "Luxury Nomad Family 42",
      price: "₹2,35,00,000",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["42 ft Length", "6 Berths", "Diesel"],
      badge: "Family Edition"
    },
    {
      id: 6,
      title: "Luxury Nomad Expedition 38",
      price: "₹2,00,00,000",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      specs: ["38 ft Length", "4 Berths", "Diesel"],
      badge: "Expedition"
    }
  ];

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContainer>
          <ManufacturerImage />
          <ManufacturerInfo>
            <ManufacturerName>Luxury Nomad</ManufacturerName>
            <ManufacturerTitle>Premium Motorhome Specialists</ManufacturerTitle>
            <ManufacturerDescription>
              Founded in 2011, Luxury Nomad has established itself as India's premier manufacturer of luxury motorhomes 
              and travel vehicles. We specialize in creating mobile homes that combine the comfort of luxury living with 
              the freedom of travel. Our vehicles feature state-of-the-art amenities, premium finishes, and innovative 
              designs that redefine the concept of home on wheels.
            </ManufacturerDescription>
            <ManufacturerMeta>
              <MetaItem>
                <Calendar size={16} />
                <span>Established 2011</span>
              </MetaItem>
              <MetaItem>
                <MapPin size={16} />
                <span>Chennai, India</span>
              </MetaItem>
              <MetaItem>
                <Users size={16} />
                <span>500+ Clients</span>
              </MetaItem>
            </ManufacturerMeta>
          </ManufacturerInfo>
        </HeroContainer>
      </HeroSection>

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

      <ProductsSection>
        <SectionTitle>Our Luxury Fleet</SectionTitle>
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductImage image={product.image}>
                <ProductBadge>{product.badge}</ProductBadge>
                <ProductActions>
                  <ActionButton>
                    <Heart size={16} />
                  </ActionButton>
                  <ActionButton>
                    <ShoppingCart size={16} />
                  </ActionButton>
                </ProductActions>
              </ProductImage>
              <ProductContent>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductSpecs>
                  {product.specs.map((spec, idx) => (
                    <span key={idx}>{spec}</span>
                  ))}
                </ProductSpecs>
                <ProductPrice>{product.price}</ProductPrice>
                <ViewButton to={`/motorhome/${product.id}`}>
                  View Details
                  <ArrowRight size={16} />
                </ViewButton>
              </ProductContent>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ProductsSection>
    </PageWrapper>
  );
};

export default LuxuryNomadPage; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const Card = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #000000;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 2;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 2;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const Content = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CarTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: -0.01em;
`;

const CarSubtitle = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-weight: 300;
`;

const CarDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BrandModel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Brand = styled.span`
  font-size: 0.8rem;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Model = styled.span`
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Price = styled.div`
  text-align: right;
`;

const PriceLabel = styled.div`
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const PriceValue = styled.div`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Feature = styled.span`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  color: #cccccc;
  border-radius: 2px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const ViewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  ${Card}:hover & {
    color: #ffffff;
  }
`;

const ArrowIcon = styled(ArrowRight)`
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: translateX(5px);
  }
`;

const CarCard = ({ car }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality
  };

  return (
    <CardLink to={`/car/${car.id}`}>
      <Card
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <ImageContainer>
          <CarImage image={car.image} />
          <ImageOverlay />
          
          {car.badge && <Badge>{car.badge}</Badge>}
          
          <ActionButtons>
            <ActionButton onClick={handleLike}>
              <Heart 
                size={16} 
                fill={isLiked ? '#ff4444' : 'none'} 
                color={isLiked ? '#ff4444' : '#ffffff'} 
              />
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <Share2 size={16} />
            </ActionButton>
          </ActionButtons>
        </ImageContainer>

        <Content>
          <CarTitle>{car.name}</CarTitle>
          <CarSubtitle>{car.description}</CarSubtitle>

          <CarDetails>
            <BrandModel>
              <Brand>{car.brand}</Brand>
              <Model>{car.model}</Model>
            </BrandModel>
            <Price>
              <PriceLabel>Price</PriceLabel>
              <PriceValue>{car.price}</PriceValue>
            </Price>
          </CarDetails>

          {car.features && car.features.length > 0 && (
            <Features>
              {car.features.slice(0, 3).map((feature, index) => (
                <Feature key={index}>{feature}</Feature>
              ))}
              {car.features.length > 3 && (
                <Feature>+{car.features.length - 3} more</Feature>
              )}
            </Features>
          )}

          <ViewButton>
            <span>View Details</span>
            <ArrowIcon size={16} />
          </ViewButton>
        </Content>
      </Card>
    </CardLink>
  );
};

export default CarCard; 
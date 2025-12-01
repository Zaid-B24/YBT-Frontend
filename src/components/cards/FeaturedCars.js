import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// import { carsData } from '../../data/carsData';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #0a0a0a;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedCard = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.image ? `url(${props.image})` : "linear-gradient(45deg, #333, #555)"};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;

  ${FeaturedCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
`;

const CardBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CardContent = styled.div`
  color: #ffffff;
`;

const CardTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

const CardButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease;
  opacity: 0.8;

  ${FeaturedCard}:hover & {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const SecondaryGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const SecondaryCard = styled(motion.div)`
  position: relative;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ViewAllSection = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: transparent;
  color: #ffffff;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const carsData = [{}];

const FeaturedCars = () => {
  // Get featured cars (first 3 from carsData)
  const featuredCars = carsData.slice(0, 3);

  return (
    <Section>
      <Container>
        <Header>
          <Title>Featured Masterpieces</Title>
          <Subtitle>
            Discover our latest automotive artistry, where engineering
            excellence meets uncompromising luxury and performance.
          </Subtitle>
        </Header>

        <Grid>
          {/* Main Featured Car */}
          <FeaturedCard
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <CardImage image={featuredCars[0]?.image} />
            <CardOverlay>
              <CardBadge>{featuredCars[0]?.category}</CardBadge>
              <CardContent>
                <CardTitle>{featuredCars[0]?.name}</CardTitle>
                <CardSubtitle>
                  {featuredCars[0]?.brand} {featuredCars[0]?.model}
                </CardSubtitle>
                <CardDescription>
                  {featuredCars[0]?.description}
                </CardDescription>
                <CardButton>
                  Explore Details
                  <ArrowRight size={20} />
                </CardButton>
              </CardContent>
            </CardOverlay>
          </FeaturedCard>

          {/* Secondary Featured Cars */}
          <SecondaryGrid>
            {featuredCars.slice(1, 3).map((car, index) => (
              <SecondaryCard
                key={car.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <CardImage image={car.image} />
                <CardOverlay>
                  <CardBadge>{car.category}</CardBadge>
                  <CardContent>
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      {car.name}
                    </CardTitle>
                    <CardSubtitle>
                      {car.brand} {car.model}
                    </CardSubtitle>
                    <CardButton>
                      View Details
                      <ArrowRight size={16} />
                    </CardButton>
                  </CardContent>
                </CardOverlay>
              </SecondaryCard>
            ))}
          </SecondaryGrid>
        </Grid>

        <ViewAllSection>
          <ViewAllButton to="/cars">
            View Complete Collection
            <ArrowRight size={20} />
          </ViewAllButton>
        </ViewAllSection>
      </Container>
    </Section>
  );
};

export default FeaturedCars;

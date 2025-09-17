import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomepageWrapper = styled.div`
  background: #000;
  color: #fff;
  overflow-x: hidden;
`;

// Hero Carousel Section
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: ${(props) => (props.image ? `url(${props.image})` : "#000")}
    center center/cover no-repeat;
  transition: all 0.5s ease;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: left;
  max-width: 600px;
  padding: 0 0 0 5vw;
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.5;
  color: #fff;
  margin-bottom: 2.5rem;
  max-width: 400px;
`;

const HeroButton = styled(Link)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

const Dot = styled.button`
  width: 40px;
  height: 3px;
  background: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.3)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

// Find Your Dream Model Section
const FindModelSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(20, 20, 20, 0.8);
  text-align: center;
`;

const FindModelTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`;

const FindModelSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 3rem;
`;

const SearchForm = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchSelect = styled.select`
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;

  option {
    background: #333;
    color: #fff;
  }
`;

const SearchButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Latest Additions Section
const LatestSection = styled.section`
  padding: 4rem 2rem;
  background: #0a0a0a;
  color: #fff;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
  text-align: center;
  color: #fff;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CarCard = styled(Link)`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const CardImage = styled.div`
  height: 250px;
  background: ${(props) => (props.image ? `url(${props.image})` : "#ddd")}
    center center/cover no-repeat;
  position: relative;
`;

const CardBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #fff;
`;

// Cars for Sale Section
const CarsForSaleSection = styled.section`
  padding: 4rem 2rem;
  background: #111;
  color: #fff;
  text-align: center;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 2rem auto 0;
`;

const CarForSaleCard = styled(Link)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const CarSaleImage = styled.div`
  height: 250px;
  background: ${(props) => (props.image ? `url(${props.image})` : "#ddd")}
    center center/cover no-repeat;
  position: relative;
`;

const AvailableBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const CarSaleContent = styled.div`
  padding: 2rem;
  text-align: left;
`;

const CarSaleTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const CarSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const DetailsButton = styled(Link)`
  background: transparent;
  border: 1px solid #000;
  color: #000;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

// Split Sections (All Cars / Rims)
const SplitSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 60vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const SplitPanel = styled.div`
  position: relative;
  background: ${(props) => (props.image ? `url(${props.image})` : "#333")}
    center center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const SplitContent = styled.div`
  position: relative;
  z-index: 2;
`;

const SplitTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`;

const SplitSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 300px;
`;

const SplitButton = styled.button`
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

// Mission Section
const MissionSection = styled.section`
  padding: 6rem 2rem;
  background: #000;
  text-align: center;
`;

const MissionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 3rem;
  letter-spacing: 0.02em;

  span {
    color: #666;
  }
`;

const MissionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const MissionButton = styled(Link)`
  background: ${(props) =>
    props.$primary ? "rgba(255,255,255,0.2)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Join Section
const JoinSection = styled.section`
  padding: 4rem 2rem;
  background: #000;
  text-align: center;
`;

const JoinTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`;

const JoinSubtitle = styled.p`
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ContactButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "YOUNG BOY TOYZ SPERANZA",
      subtitle:
        "Completely Mercedes G-Class (W465) converted into a 4-door convertible",
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      title: "Rolls-Royce Cullinan MY 2025 By YOUNG BOY TOYZ",
      subtitle: "The ultimate luxury SUV redefined",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      title: "Bugatti Chiron YOUNG BOY TOYZ",
      subtitle: "The ultimate expression of automotive excellence and luxury",
      image:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  const latestAdditions = [
    {
      id: "alec-monopoly-collaboration",
      title:
        "YOUNG BOY TOYZ goes art – Collaboration with pop artist Alec Monopoly",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80",
      badges: [
        "WIDE BODY KIT",
        "LIMITED EDITION",
        "LATEST ADDITIONS",
        "ATELIER",
      ],
    },
    {
      id: "bmw-m5-ybt-edition",
      title: "BMW M5 YOUNG BOY TOYZ Edition",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badges: ["LATEST ADDITIONS", "PERFORMANCE"],
    },
    {
      id: "pugnator-tricolore",
      title: "Lamborghini Pugnator Tricolore",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      badges: ["ATELIER", "LATEST ADDITIONS", "ONE OF ONE", "WIDE BODY KIT"],
    },
  ];

  const carsForSale = [
    {
      id: "tesla-cybertruck-elongation-evo",
      title: "Tesla Cybertruck - Elongation EVO by YOUNG BOY TOYZ",
      type: "SUV",
      year: "2024",
      transmission: "AUTOMATIC",
      power: "630 HP",
      mileage: "100 KM",
      number: "NR.1113",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "lamborghini-urus-coupe",
      title: "Lamborghini Urus Coupé by YOUNG BOY TOYZ",
      type: "COUPE",
      year: "2021",
      transmission: "AUTOMATIC",
      power: "900 HP",
      mileage: "219 KM",
      number: "NR.714",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: "lamborghini-aventador-ultima",
      title: "Lamborghini Aventador Ultima 1/350 by YOUNG BOY TOYZ",
      type: "COUPE",
      year: "2022",
      transmission: "AUTOMATIC",
      power: "770 HP",
      mileage: "200 KM",
      number: "NR.840",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <HomepageWrapper>
      {/* Hero Carousel */}
      <HeroSection>
        <HeroBackground image={heroSlides[currentSlide].image} />
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>{heroSlides[currentSlide].title}</HeroTitle>
          <HeroSubtitle>{heroSlides[currentSlide].subtitle}</HeroSubtitle>
          <HeroButton to="/models">DISCOVER NOW</HeroButton>
        </HeroContent>
        <CarouselDots>
          {heroSlides.map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </CarouselDots>
      </HeroSection>

      {/* Find Your Dream Model */}
      <FindModelSection>
        <FindModelTitle>FIND YOUR DREAM MODEL</FindModelTitle>
        <FindModelSubtitle>
          Choose options from below and find your customization
        </FindModelSubtitle>
        <SearchForm>
          <SearchSelect>
            <option>Brand</option>
            <option>Ferrari</option>
            <option>Lamborghini</option>
            <option>Porsche</option>
            <option>Mercedes-Benz</option>
          </SearchSelect>
          <SearchSelect>
            <option>Model</option>
            <option>F8 Tributo</option>
            <option>Huracán</option>
            <option>911 Turbo S</option>
            <option>G-Class</option>
          </SearchSelect>
          <SearchButton to="/models">SEARCH</SearchButton>
        </SearchForm>
      </FindModelSection>

      {/* Latest Additions */}
      <LatestSection>
        <SectionTitle>LATEST ADDITIONS</SectionTitle>
        <CardsGrid>
          {latestAdditions.map((car, index) => (
            <CarCard key={index} to={`/cars/${car.id}`}>
              <CardImage image={car.image}>
                <CardBadges>
                  {car.badges.map((badge, i) => (
                    <Badge key={i}>{badge}</Badge>
                  ))}
                </CardBadges>
              </CardImage>
              <CardContent>
                <CardTitle>{car.title}</CardTitle>
              </CardContent>
            </CarCard>
          ))}
        </CardsGrid>
      </LatestSection>

      {/* Cars for Sale */}
      <CarsForSaleSection>
        <SectionTitle>CARS FOR SALE</SectionTitle>
        <CarsGrid>
          {carsForSale.map((car, index) => (
            <CarForSaleCard key={index} to={`/cars/${car.id}`}>
              <CarSaleImage image={car.image}>
                <AvailableBadge>AVAILABLE • {car.number}</AvailableBadge>
              </CarSaleImage>
              <CarSaleContent>
                <CarSaleTitle>{car.title}</CarSaleTitle>
                <CarSpecs>
                  <span>{car.type}</span>
                  <span>{car.year}</span>
                  <span>{car.transmission}</span>
                  <span>{car.power}</span>
                  <span>{car.mileage}</span>
                </CarSpecs>
              </CarSaleContent>
            </CarForSaleCard>
          ))}
        </CarsGrid>
      </CarsForSaleSection>

      {/* Split Sections */}
      <SplitSection>
        <SplitPanel image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80">
          <SplitContent>
            <SplitTitle>ALL CARS</SplitTitle>
            <SplitSubtitle>
              We create unique masterpieces that defy convention.
            </SplitSubtitle>
            <SplitButton>
              <ArrowRight size={20} />
            </SplitButton>
          </SplitContent>
        </SplitPanel>
        <SplitPanel image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80">
          <SplitContent>
            <SplitTitle>RIMS</SplitTitle>
            <SplitSubtitle>
              Each rim has its own story. Match it with your unique style.
            </SplitSubtitle>
            <SplitButton>
              <ArrowRight size={20} />
            </SplitButton>
          </SplitContent>
        </SplitPanel>
      </SplitSection>

      {/* Mission Statement */}
      <MissionSection>
        <MissionTitle>
          OUR MISSION GOES BEYOND TUNING.
          <br />
          WE CREATE UNIQUE MASTERPIECES
          <br />
          <span>THAT DEFY CONVENTION</span>
        </MissionTitle>
        <MissionButtons>
          <MissionButton to="/about">ABOUT US</MissionButton>
          <MissionButton to="/models" $primary>
            ALL MODELS
          </MissionButton>
        </MissionButtons>
      </MissionSection>

      {/* Join YOUNG BOY TOYZ */}
      <JoinSection>
        <JoinTitle>JOIN YOUNG BOY TOYZ</JoinTitle>
        <JoinSubtitle>Get in touch to make your dream car true.</JoinSubtitle>
        <ContactButton to="/contact">CONTACT US</ContactButton>
      </JoinSection>
    </HomepageWrapper>
  );
};

export default Homepage;
